const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Schema Configuration
const signUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Id");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
  },
  password: {
    type: String,
    required: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

  lBooks: [
    {
      type: Object,
    },
  ],

  institution: {
    type: String,
    required: true,
  },
});

//Hashing password using bcrypt.js
signUpSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//Generate Authentication Token
signUpSchema.methods.generateAuthToken = async function () {
  const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
  this.tokens = this.tokens.concat({ token: token });
  await this.save();
  return token;
};

//Updates the books list with the new books being created the user
signUpSchema.methods.update = async function (query, image) {
  const { lbook, ltime } = query;
  console.log(lbook);
  console.log(ltime);
  this.lBooks = this.lBooks.concat({ lbook, ltime, image });
  await this.save();
  return 1;
};

const signUpModel = mongoose.model("SignUpModel", signUpSchema);

module.exports = signUpModel;
