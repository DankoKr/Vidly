const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
require('dotenv').config({ path: './config/.env' });
const express = require('express');
const app = express();

const DB_URL = process.env.DB_URL
mongoose.connect(DB_URL)
.then(()=> console.log('Connected to MongoDB.....'))
.catch(()=>console.log('shit...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on ${port}...`));

