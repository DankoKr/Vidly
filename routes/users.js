const _ = require('lodash');
const auth = require('../middleware/auth');
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/me', auth, async(req, res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already exists!');

    user = new User( _.pick(req.body, ['_id', 'name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/:id', auth, async(req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Invalid id');

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    user.set({name: req.body.name});
    await user.save();
    res.send(user);
});


router.delete('/:id', auth, async(req, res)=>{
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('Invalid id');

    res.send('deleted user')
});

module.exports = router;