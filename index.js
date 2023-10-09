const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
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

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on ${port}...`));

