const mongoose = require("mongoose");
const validator = require("validator");

const signInSchema = new mongoose.Schema({
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
});

const signInModel = mongoose.model("SignUpModel", signUpSchema);

module.exports = signInModel;