const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var SSE = require('express-sse');
var sse = new SSE();

const db = require('./db');
db.run("CREATE TABLE reaction (timestamp TEXT, type TEXT, weight INTEGER, deviceId TEXT)").then(() => {
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));


    app.get('/event', sse.init);

    app.post('/reaction/', (req, res) => {
        let ts = new Date().toISOString();
        let weight = 1;

        db.insert("INSERT INTO reaction VALUES (?, ?, ?, ?)", [ts, req.body['type'], weight, req.body['deviceId']]).then(() => res.send());
    });

    app.listen(port, () => {
        console.log(`listening at ${port}`)
    });

    setInterval(() => {
        db.all("SELECT COUNT(type) AS count, type FROM reaction GROUP BY type").then(rows => {
            let event = {};
            (rows || []).forEach(element => {
                event[element['type']] = element['count'];
            });
            sse.send(event, "reaction");
        });
    }, 1000);
});