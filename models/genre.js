const Joi = require('joi');
const mongoose = require('mongoose');

const validateGenre = (genre)=>{
    const schema = Joi.object({name: Joi.string().min(5).max(15).required()});
    return schema.validate(genre);
};

const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    }
});

const Genre = mongoose.model('Genre', genreSchema);

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;