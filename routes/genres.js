const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});

router.get('/:id', async(req, res)=>{
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Invalid id');
    res.send(genre);
});

router.put('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Invalid id');

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.set({name: req.body.name});
    await genre.save();
    res.send(genre);
});


router.delete('/:id', async(req, res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('Invalid id');

    res.send('deleted genre')
});

module.exports = router;