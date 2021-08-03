const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

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

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

signInSchema.methods.generateAuthToken=async function() {

    const token = await jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token: token});
    await this.save();
    return token;
}

const signInModel = mongoose.model("SignInModel", signInSchema);

module.exports = signInModel;