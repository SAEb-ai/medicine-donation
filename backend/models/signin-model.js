const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const signInSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email Id");
            }
        }
    },

    password: {
        type: String,
        required: true
    },

});

const signInModel = mongoose.model("SignInModel", signInSchema);

module.exports = signInModel;
