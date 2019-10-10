// app.js

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const snippet = require('./snippet.js');



const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'hbs');

const logger = function(req, res, next) {   // custom middleware for debugging
    console.log('Method: ' + req.method);
    console.log('Path: ' + req.path);
    console.log(req.query);
    next();
};

app.use(logger);

app.get('/', (req, res) => {    // routing
    res.render('home', {objs: snippets});
})

app.get('/add', (req, res) => {
    res.render('add');
})


const codeSamplePath = path.resolve(__dirname, 'code-samples');
const snippets = [];

fs.readdir(codeSamplePath, 'utf-8', (err, files) => {
    if(err) {
        throw err;
    }
    else {

        for(let i = 0; i < files.length; i++) { // iterate through files in directory

            if(path.extname(files[i]) === '.js') {  // validate js file

                fs.readFile(path.resolve(codeSamplePath, files[i]), 'utf-8', (err, data) => {
                    if(err) {
                        throw err;
                    }
                    else {  // create new Snippets and add to array
                        const tags = parseTags(data);
                        const newSnippet = new snippet.Snippet(files[i], data, tags);
                        snippets.push(newSnippet);
                        console.log(JSON.stringify(newSnippet));
                    }
                });

            }
        }
        app.listen(3000);

        console.log('Server started; type CTRL+C to shut down');
    }
});
console.log(JSON.stringify(snippets));


function parseTags(data) {
    const firstLine = data.slice(data.indexOf('//')+2, data.indexOf('\n'));
    const tags = firstLine.trim().split(', ');
    return tags;
}


