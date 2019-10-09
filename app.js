// app.js

const express = require('express');
const app = express();
const path = require('path');

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'hbs');

const logger = function(req, res, next) {   // custom middleware for debugging
    console.log("Method: " + req.method);
    console.log("Path: " + req.path);
    console.log(req.query);
    next();
};

app.use(logger);

app.get('/', (req, res) => {    // routing
    res.render('home');
})

app.get('/add', (req, res) => {
    res.render('add');
})

app.listen(3000);

console.log('Server started; type CTRL+C to shut down');