const {Movie, validate} = require('../models/movie');
const auth = require('../middleware/auth');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.post('/', auth, async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalid genre');

    const movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });

    await movie.save();
    res.send(movie);
});

router.get('/:id', async(req, res)=>{
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send('Invalid id');
    res.send(movie);
});

router.put('/:id', auth, async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Invalid id');

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalid genre');

    movie.set({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
});


router.delete('/:id', auth, async(req, res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('Invalid id');

    res.send('deleted movie')
});

module.exports = router;