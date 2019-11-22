const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const app = express();
const carBl = require('./server/car-bl.js');
const PORT = 3201;
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    const skipEndPoint = [
        {
            path: '/login',
            method: 'POST'
        },
        {
            path: '/cars',
            method: 'GET'
        }
    ]
    
    if (skipEndPoint.find(endPoint => endPoint.method === req.method && endPoint.path === req.path)) {
        
        next();
    }
    else {
        try {
            
            const token = jwt.verify(splitCredentials(req.headers.authorization), 'shoko');
            next();
        } catch (ex) {
            console.log(ex);
            res.status(403).send();
        }
    }
})
app.post('/login', function (req, res) {
    const { user, pass } = splitCredentials(req.headers.authorization);
    if (!user) {
        res.status(403).send();
    } else {
        if (user === 'a' && pass === 'a') {
            const token = jwt.sign({
                user: user,
            }, 'shoko',
                {
                    expiresIn: 50000
                });
            res.send(token);
        } else {
            res.status(403).send();
        }
    }
});

function splitCredentials(str) {
    if (str) {
        const authHeader = str.split(' ');
        if (authHeader[0] === 'basic') {

            return {
                user: atob(authHeader[1]).split(':')[0],
                pass: atob(authHeader[1]).split(':')[1]
            }
        } else if (authHeader[0] === 'bearer') {
            return authHeader[1];
        }
    }
}
app.get('/cars', (req, res) => {
    carBl.getCars((e, data) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});



app.get('/car/:id', (req, res) => {
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
app.post('/car', (req, res) => {
    carBl.createCar((e, data) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

app.put('/car/:id', (req, res) => {
    carBl.updateCar(Number(req.params.id), function (e, data) {
        if (e) {
            console.log(e)
            return res.status(500).send();
        } else {
            console.log(data);
            return res.send(data);
        }
    })
});

app.delete('/car/:id', (req, res) => {
    carBl.deleteCar(Number(req.params.id), function (e, data) {
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