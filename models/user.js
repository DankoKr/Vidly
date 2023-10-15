const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const passwordComplexity = require("joi-password-complexity");
const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.jwtPrivateKey);
    return token;
};

const User = mongoose.model('User', userSchema);

const complexityOptions = {
    min: 8,
    max: 26,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

const validateUser = (user)=>{
    const schema = Joi.object(
        {
            name: Joi.string().min(5).max(30).required(),
            password: passwordComplexity(complexityOptions),
            email: Joi.string().min(5).max(255).required()
        });
    return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;