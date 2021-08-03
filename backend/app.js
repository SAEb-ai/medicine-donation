const express = require("express");
const app =express();
const db =require("./db/connection");
const signUpModel =require("./models/siginup-model");
const port =process.env.port || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.status(200).render("Hello! Welcome to the helpng society");
})

app.post("/sign-up", async(req,res) => {
    try {
        const findUser = await signUpModel.findOne({email: req.body.email});
        if(findUser) {
            return res.status(422).json({error:"Email Already Exists"});
        }
        const user = new signUpModel(req.body);
        const userDataSaved = await user.save();
        if(userDataSaved) {
            res.status(201).json({message: "Successful SignUp"});
        }
        res.end();
    }
    catch(err) {
        console.log(err);
    }

})

app.post("/sign-in", async(req,res) => {
    try {
        const findUser = await signUpModel.findOne({email: req.body.email});
        if(findUser) {
            return res.status(409).json({error:"Email Already Exists"});
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