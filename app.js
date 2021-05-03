const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const logger = require('morgan');

const createdMovies = [createMovie(1, 'goodmovie', 152, false, 71, 12, 'its a movie1'), createMovie(2, 'baddmovie', 112, true, 42, 5, 'its a movie2')];

app.use(logger('dev', {
    skip: req => !req.url.endsWith('.html') && req.url.indexOf('.') > -1
}));

const bodyParser = require('body-parser');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');


const mongoose = require("mongoose");
// starter mongoDb og opretter forbindelsen til databasen, 
// også selv om variablen 'db' ikke benyttes
const db = mongoose.connect("mongodb://localhost:27017/ServersideScripting", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});



app.use(express.static('./public'));

function createMovie(i_movieId, i_title, i_runtime, i_watched, i_rating, i_production, i_description){
    let newMovie = new Object();
    newMovie.movieId = i_movieId;
    newMovie.title = i_title;
    newMovie.runtime = i_runtime;
    newMovie.watched = i_watched;
    newMovie.rating = i_rating;
    newMovie.production = i_production;
    newMovie.description = i_description;
    return newMovie;
}

require('./routes')(app);

app.listen(port,()=>{
    console.log(`serveren kører... http://localhost:${port}`);
});
