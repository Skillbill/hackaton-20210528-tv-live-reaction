const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var SSE = require('express-sse');
var sse = new SSE();

const db = require('./db');
db.run("CREATE TABLE reaction (timestamp TEXT, type TEXT, weight INTEGER, deviceId TEXT)").then(() => {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    app.get('/api/event', sse.init);

    app.post('/api/reaction/', (req, res) => {
        let ts = new Date().toISOString();
        let weight = 1;

        db.insert("INSERT INTO reaction VALUES (?, ?, ?, ?)", [ts, req.body['type'], weight, req.body['deviceId']]).then(() => {
            res.send();
            return db.all("SELECT COUNT(type) AS count, type FROM reaction GROUP BY type");
        }).then(rows => {
            sse.send(rows, "reaction");
        });
    })
    
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
})