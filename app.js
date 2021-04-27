const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const logger = require('morgan');

app.use(logger('dev', {
    skip: req => !req.url.endsWith('.html') && req.url.indexOf('.') > -1
}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', (req, res)=>{
    let movie = {
        title:'GoodMovie',
        runtime: 162,
        watched: false,
        rating: 71,
        production: 12,
        description: 'its a movie :)'
    }

    res.render('index',{
        title: 'h5serversidescripting',
        message: 'Hello world1112342',
        data:[1,2,3,4,5,6],
        titel: 'derp',
        author: 'testa2',
        pages: 123,
        genre: 'fak',
        read: true,
        movie: movie
    });
});

app.listen(port,()=>{
    console.log(`serveren kører... http://localhost:${port}`);
});
