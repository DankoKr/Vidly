require('express-async-errors');
const Joi = require('joi');
const error = require('./middleware/error');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const users = require('./routes/users');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const auth = require('./routes/auth');
require('dotenv').config({ path: './config/.env' });
const express = require('express');
const app = express();

if(!process.env.jwtPrivateKey){
    console.error('FATAL ERROR: Key not devined');
    process.exit(1);
};

const DB_URL = process.env.DB_URL
mongoose.connect(DB_URL)
.then(()=> console.log('Connected to MongoDB.....'))
.catch(()=>console.log('shit...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on ${port}...`));

