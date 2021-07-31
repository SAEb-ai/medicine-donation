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
        console.log(req.body);
        const user = new signUpModel(req.body);
        const userDataSaved = await user.save();
        console.log(userDataSaved);
        res.status(201).send("Successful");
        res.end();
    }
    catch(err) {
        res.status(404).send("Page Not Found");
    }

})
app.listen(port, () => console.log(`Server started listening at port ${port}`));