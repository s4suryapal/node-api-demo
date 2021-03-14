
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema ({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 255
    },
    lastName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 255
    },
    username : {
      type : String,
      required : true,
      minlength : 3,
      maxlength : 255
    },
    age : {
        type : Number,
        required : true,
        minlength : 1,
        maxlength : 10
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255
    },
    email : {
        type : String,
        required : true,
        minlength : 1,
        maxlength : 255
    },
    avatar : {
        type : String,
        required : true,
        minlength : 1,
        maxlength : 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin },process.env.JWT_KEY);
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        firstName : Joi.string().min(3).max(255).required(),
        lastName : Joi.string().min(3).max(255).required(),
        username : Joi.string().min(3).max(255).required(),
        age : Joi.number().required(),
        password : Joi.string().required(),
        email : Joi.string().email().required(),
        avatar : Joi.required(),
    });

    return schema.validate(user);
}


module.exports.validateUser = validateUser;
module.exports.User = User;
