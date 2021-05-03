const mongoose = require('mongoose');
const { Schema } = mongoose;

const Movie = new Schema({
    title: {type:String},
    runtime: {type:Number},
    watched: {type:Boolean},
    rating: {type:Number},
    production: {type:Number},
    description: {type:String}
});

module.exports = mongoose.model("Movie", Movie, 'movies')