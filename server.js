const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const app = express();
const carBl = require('./server/car-bl.js');
const PORT = 3201;
const cors = require('cors');
app.use(cors())
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
// app.use(function (req, res, next) {
//     if (req.method === 'POST' && req.path === '/auth') {
//         next();
//     }
//     else {
//         try {
//             const token = jwt.verify(splitCredentials(req.headers.authorization), 'shhhhh');
//             next();
//         } catch (ex) {
//             console.log(ex);
//             res.status(403).send();
//         }
//     }
// })
app.get('/car', (req, res) => {
    carBl.getCars((e, data) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

app.get('/car/:id', (req, res) => {
    console.log(req.params.id)
    carBl.getCar(Number(req.params.id), function (e, data) {
        if (e) {
            console.log(e)
            return res.status(500).send();
        } else {
            console.log(data);
            return res.send(data);
        }
    })
});

app.listen(process.env.PORT || PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT || PORT}!`),
);