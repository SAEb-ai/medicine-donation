const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    }],

    lBooks: [{
        type: Object
        // lbook: {
        //     type: String
        //     // required: true
        // },

        // ltime: {
        //     type: Number,
        //     // required: true
        // },

        // // image: {
        // //     data: Buffer,
        // //     contentType: String,
        // // }
    }],

    institution: {
        type: String,
        required: true
    }


    // }
});

signUpSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    } 
    next();
});

signUpSchema.methods.generateAuthToken = async function() {
    const token = await jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token: token});
    await this.save();
    return token;
};

signUpSchema.methods.update = async function(query, image) {
    const {lbook, ltime} = query;
    console.log(lbook);
    console.log(ltime);
    this.lBooks = this.lBooks.concat({lbook, ltime, image});
    // this.lBooks = this.lBooks.concat({ltime: ltime});
    await this.save();
    return 1;
};

// signUpSchema.methods.update1 = async function(image) {
//     this.lBooks = this.lBooks.concat({image: image});
//     await this.save();
//     return 1;
// };

const signUpModel = mongoose.model("SignUpModel", signUpSchema);

module.exports = signUpModel;