const {Customer, validate} = require('../models/customer');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', auth, async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = new Customer(
        {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });
    await customer.save();
    res.send(customer);
});

router.get('/:id', async(req, res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('Invalid id');
    res.send(customer);
});

router.put('/:id', auth, async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Invalid id');

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    customer.set({name: req.body.name});
    customer.set({phone: req.body.phone});
    customer.set({isGold: req.body.isGold});
    await customer.save();
    res.send(customer);
});


router.delete('/:id', auth, async(req, res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('Invalid id');

    res.send('deleted customer')
});

module.exports = router;