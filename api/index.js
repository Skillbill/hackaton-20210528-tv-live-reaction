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
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <script>
            let variable = new EventSource('http://localhost:3000/event');
            variable.onmessage = function(event) {
              console.log(event);
            }
          </script>
        </body>
        </html>`)
    })
    
    app.get('/event', (req, res, next) => {
        res.flush = () => {}; 
        next();
        }, sse.init);

    app.post('/reaction/', (req, res) => {
        let ts = new Date().toISOString();
        let weight = 1;

        db.insert("INSERT INTO reaction VALUES (?, ?, ?, ?)", [ts, req.body['type'], weight, req.body['deviceId']]).then(() => {
            res.send();
            return db.all("SELECT COUNT(type) AS count, type FROM reaction GROUP BY type");
        }).then(rows => {
            let event = {};            
            rows.forEach(element => {
                event[element['type']] = element['count'];                
            });
            sse.send(event, "reaction");
        });
    })
    
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
})