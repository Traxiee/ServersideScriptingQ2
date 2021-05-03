const Movie = require('./models/movieModel');
const fs = require('fs');

async function getMovies(){
	return await Movie
						.find()
						.collation({locale:'da'})
						.sort({'title':'asc'});
}



let moviess = []
module.exports = (app) => {
    
    

    app.get('/', async(req, res)=>{

        moviess = await Movie.find();

        let movies = await getMovies();

        

        res.render('index',{
            title: 'h5serversidescripting',
            message: 'Hello world1112342',
            data:[1,2,3,4,5,6],
            titel: 'derp',
            author: 'testa2',
            pages: 123,
            genre: 'fak',
            read: true,
            moviess,
            movies
        });
    });
    
    
    app.get('/movies', async (req, res)=>{
        //res.send(req.params.movieIds);
        let movies = await getMovies();


        res.render('movies', {
            movie: new Movie(),
            movies
        });
    });
    
    app.post('/movies', async (req, res) => {
    
        let movie = new Movie(req.body);

        let message = [];

        if(movie.title == ""){
            message.push('Movie needs a title')
        }
        if(movie.runtime == null){
            message.push('Runtime needs a value')
        }
        if(movie.rating == null){
            message.push('Rating needs a value')
        }
        if(movie.production == null){
            message.push('Production needs a value')
        }
        if(movie.description == ""){
            message.push('Movie needs a description')
        }
        if(isNaN(req.body.runtime))
        {
            message.push('Runtime must contain numbers')
        }
        if(isNaN(req.body.rating))
        {
            message.push('Rating must contain numbers')
        }
        if(isNaN(req.body.production))
        {
            message.push('Production must contain numbers')
        }


        console.log(req.body.watched);
        //if(req.body.read)
        movie.watched = (req.body.watched == "on" ? true : false);

        if(message.length == 0) {

            if(req.files != undefined && req.files.image != undefined)
            {
                await req.files.image.mv(`./public/images/${req.files.image.name}`)
                movie.imageName = req.files.image.name;
            }

        
        await movie.save();
        res.redirect('/movies');
        }
        else{
            let movies = await getMovies();
            console.log(req.body.watched);
            res.render('movies',{
            title : req.body.title,
            runtime : req.body.runtime,
            rating : req.body.rating,
            production : req.body.production,
            description : req.body.description,
            watched:  req.body.watched,
            movie: req.body,
            movies,
            message: message.join(', ')
        })};
        });


        app.get('/movies/edit/:id', async (req, res) => {
            let movies = await getMovies();
    
            try {
                let movie = await Movie.findById(req.params.id);
                if (movie != null) {
    
                    res.render('movies', {
                        movies,
                        movie
                    });
                }
            } catch (ex) {
                console.log(ex.message);
                res.redirect('/movies');
            }
        });



        app.post('/movies/edit/:id', async (req, res) => {
            let message = [];
    
            if(req.body.title == ""){
                message.push('Movie needs a title')
            }
            if(req.body.runtime == null){
                message.push('Runtime needs a value')
            }
            if(req.body.rating == null){
                message.push('Rating needs a value')
            }
            if(req.body.production == null){
                message.push('Production needs a value')
            }
            if(req.body.description == ""){
                message.push('Movie needs a description')
            }
            if(isNaN(req.body.runtime))
            {
                message.push('Runtime must contain numbers')
            }
            if(isNaN(req.body.rating))
            {
                message.push('Rating must contain numbers')
            }
            if(isNaN(req.body.production))
            {
                message.push('Production must contain numbers')
            }
    
            if (message.length == 0) {
                let movie = await Movie.findById(req.params.id).exec();
                if(fs.existsSync('./public/images/' + movie.imageName)){
                    fs.rmSync('./public/images/' + movie.imageName);
                } 
                if(req.files != undefined && req.files.image != undefined)
            {
                await req.files.image.mv(`./public/images/${req.files.image.name}`)
                req.body.imageName = req.files.image.name;
            }
                




                req.body.watched = (req.body.watched == "on" ? true : false);
                await Movie.findByIdAndUpdate(req.params.id, req.body);
                res.redirect('/movies');
            }else{
                let movies = await getMovies();
                res.render('movies', {
                    movie: req.body,
                    movies,
                    message: message.join(', ')
                });
            }
    
    
    
        });


        app.get('/movies/delete/:id', async (req, res) => {
            let movie = await Movie.findById(req.params.id).exec();
                if(fs.existsSync('./public/images/' + movie.imageName)){
                    fs.rmSync('./public/images/' + movie.imageName);
                } 
            await Movie.findByIdAndDelete(req.params.id);
            res.redirect('/movies');
        });



    app.get('/moviedetail/:movieIds', (req, res)=>{
        //res.send(req.params.movieIds);
        res.render('moviedetail',{
            movie: moviess.find(x => x._id == req.params.movieIds),
        });
    });
    
    
};