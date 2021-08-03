require('dotenv').config();
const express = require("express");
const app =express();
const db =require("./db/connection");
const signUpModel =require("./models/siginup-model");
const signInModel = require("./models/signin-model");
const port =process.env.port || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.status(200).render("Hello! Welcome to the helpng society");
})

app.post("/sign-in", async(req,res) => {
    try {
        const findUser = await signUpModel.findOne({email: req.body.email});
        if(!findUser) {
            return res.status(422).json({error:"Please Sign Up first"});
        }
        // TODO: Check if the password entered matches with the password in the backend
        const userLogin = new signInModel(req.body);
        await userLogin.save();
        const token = await userLogin.generateAuthToken();
        console.log(token);
        res.end();
    }
    catch(err) {
        console.log(err);
    }

})

app.post("/sign-up", async(req,res) => {
    try {
        const findUser = await signUpModel.findOne({email: req.body.email});
        if(!findUser) {
            return res.status(422).json({error:"Please Sign Up First"});
        }
        const user = new signUpModel(req.body);

        const userDataSaved = await user.save();
        if(userDataSaved) {
            res.status(201).json({message: "Successful SingUp"});
        }
        res.end();
    }
    catch(err) {
        console.log(err);
    }

})
app.listen(port, () => console.log(`Server started listening at port ${port}`));