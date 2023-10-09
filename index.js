const express = require('express');
const app = express();
const mongoose = require('mongoose');

DB_URL = 'mongodb+srv://dankokralski776:danko2003@cluster0.vyi80na.mongodb.net/vidly';
mongoose.connect(DB_URL)
.then(()=> console.log('Connected to MongoDB.....'))
.catch(()=>console.log('shit...'));

const genreSchema = new mongoose.Schema({name: String});
const Genre = mongoose.model('Genre', genreSchema);

async function createGenre(){
    const genre = new Genre({name: "Horror"});
    const result = await genre.save();
    console.log(result);
};

async function getGenres(){
    const genres = await Genre.find();
    console.log(genres);
};

getGenres();
//createGenre();
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on ${port}...`));

