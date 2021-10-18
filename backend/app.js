require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app =express();
const db =require("./db/connection");
const signUpModel =require("./models/siginup-model");
const signInModel = require("./models/signin-model");
const authenticate = require("./middleware/authenticate");
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.status(200).render("Hello! Welcome to the helpng society");
})

app.post("/sign-in", async(req,res) => {
    try {
        let token;
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({error: "Plz fill the data" });
        }
        const findUser = await signUpModel.findOne({email: req.body.email});
        if(!findUser) {
            return res.status(400).json({error:"Please Sign Up first"});
        }
        // TODO: Check if the password entered matches with the password in the backend
        const isMatched = await bcrypt.compare(password, findUser.password);
        if(!isMatched) {
            return res.status(400).json({error: "Invalid Credentials"});
        }
        token = await findUser.generateAuthToken();

        res.cookie('jwttoken', token, {
            expires: new Date(Date.now()+20000000),
            httpOnly:true
        });
        return res.status(201).json({message:"Successful SignIn"});
    }
    catch(err) {
        console.log(err);
    }

})

app.post("/sign-up", async(req, res) => {
    try {
        const findUser = await signUpModel.findOne({email: req.body.email});
        if(findUser) {
            return res.status(422).json({error:"Account already created"});
        }
        const user = new signUpModel(req.body);

        const userDataSaved = await user.save();
        if(userDataSaved) {
            return res.status(201).json({message: "Successful SingUp"});
        }
    }
    catch(err) {
        console.log(err);
    }

});

app.post("/about", authenticate, (req,res)=> {
    console.log(req.rootUser);
});

app.post("/todo", authenticate, (req,res) => {
    let token;
    const { perform, institution } = req.body;
    if(!email || !password) {
        return res.status(400).json({error: "Plz fill the data" });
    }
    
});

app.listen(port, () => console.log(`Server started listening at port ${port}`));