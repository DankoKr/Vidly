require('dotenv').config({ path: './config/.env' });
const express = require('express');
const app = express();

require('./startup/logger')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on ${port}...`));