const mongoose = require("mongoose");
const validator = require("validator");

const signUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email Id");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    }
});

const signUpModel = mongoose.model("SignUpModel", signUpSchema);

module.exports = signUpModel;