const mongoose = require('mongoose');

module.exports = function(){
    const DB_URL = process.env.DB_URL
    mongoose.connect(DB_URL)
      .then(()=> console.log('Connected to MongoDB.....'))
      .catch(()=>console.log('shit...'));
}