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
    return db.run("INSERT INTO reaction_store VALUES('like', 0), ('love', 0), ('angry', 0), ('sigh', 0), ('laugh', 0), ('clap', 0), ('party', 0)");
}).then(() => {
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

    app.get('/event', sse.init);

    app.post('/reaction/', (req, res) => {
        let ts = new Date().toISOString();
        let weight = 1;

        db.get("SELECT COUNT(*) AS count FROM reaction_store WHERE type=? AND active = 1", [req.body['type']]).then(row => {
            console.log(row)
            if(row['count']){
                db.query("INSERT INTO reaction VALUES (?, ?, ?, ?)", [ts, req.body['type'], weight, req.body['deviceId']]).then(() => res.send());
            }else {
                res.sendStatus(400);
            }
        })
    });

    app.post('/be-reset/', (req, res) => {

        db.run("UPDATE reaction_store SET active = 0").then(() => {
            return db.run("DELETE FROM reaction");
        }).then(() => {
            let arr = [];

            (req.body || []).forEach(element => {
                arr.push(db.query("UPDATE reaction_store SET active = 1 WHERE type = ?", [element]));
            });
            return Promise.all(arr);            
        }).then(() => {           
            res.send();
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    });

    app.get('/status/', (req, res) => {

        db.all("SELECT type FROM reaction_store WHERE active = 1").then(rows => {

            console.log(rows);
            let types = [];
            
            rows.forEach(element => {
                types.push(element['type'])
            });

            res.send(types);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
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