const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var SSE = require('express-sse');
var sse = new SSE();



const db = require('./db');
db.run("CREATE TABLE reaction (timestamp TEXT, type TEXT, weight INTEGER, deviceId TEXT)").then(() => {
    return db.run("CREATE TABLE reaction_store (type TEXT, active INTEGER)");
}).then(() => {
    return db.run("INSERT INTO reaction_store VALUES('red', 1), ('yellow', 1), ('green', 1), ('blue', 1)");
}).then(() => {
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

    app.get('/event', sse.init);

    app.post('/reaction/', (req, res) => {
        let ts = new Date().toISOString();
        let weight = 1;

        db.get("SELECT COUNT(*) AS count FROM reaction_store WHERE type=? AND active = 1", [req.body['type']]).then(row => {
            if(row['count']){
                db.insert("INSERT INTO reaction VALUES (?, ?, ?, ?)", [ts, req.body['type'], weight, req.body['deviceId']]).then(() => res.send());
            }else {
                res.sendStatus(400);
            }
        })
    });

    app.listen(port, () => {
        console.log(`listening at ${port}`)
    });

    setInterval(() => {
        db.all("SELECT COUNT(type) AS count, type FROM reaction WHERE type IN (SELECT type FROM reaction_store WHERE active = 1) GROUP BY type").then(rows => {
            let event = {};
            (rows || []).forEach(element => {
                event[element['type']] = element['count'];
            });
            sse.send(event, "reaction");
        });
    }, 1000);
});