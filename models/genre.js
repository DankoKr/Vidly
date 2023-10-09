const Joi = require('joi');
const mongoose = require('mongoose');

const validateGenre = (genre)=>{
    const schema = Joi.object({name: Joi.string().min(5).max(15).required()});
    return schema.validate(genre);
};

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    }
}));

exports.Genre = Genre;
exports.validate = validateGenre;