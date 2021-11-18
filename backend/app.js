require('dotenv').config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app =express();
const nodemailer = require("nodemailer");
const db =require("./db/connection");
const signUpModel =require("./models/siginup-model");
const authenticate = require("./middleware/authenticate");
const cookieParser = require("cookie-parser");
var fs = require('fs');
var path = require('path');
const port = process.env.PORT || 8080;
var bodyParser = require('body-parser');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'borrow.helpers@gmail.com',
      pass: 'Shahbaz@01'
    }
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");

  
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage });
// app.get('/', (req, res) => {
//     imgModel.find({}, (err, items) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('An error occurred', err);
//         }
//         else {
//             res.render('imagesPage', { items: items });
//         }
//     });
// });
// // app.get("/", (req, res) => {
// //     res.status(200).render("Hello! Welcome to the helpng society");
// // })

// app.post('/', upload.single('image'), (req, res, next) => {
//     console.log(req.file);
//     var obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     imgModel.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// });

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
        console.log(token);

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
    
    const { perform } = req.body;
    if(!perform) {
        return res.status(400).json({error: "Plz fill the data" });
    }
    res.end();
});

app.post("/delete", authenticate, async(req, res) => {
    console.log(req.body.book);
    const findUser = await signUpModel.findOneAndUpdate({'lBooks.lbook': req.body.book},{ $pull: { 'lBooks': {'lbook': req.body.book} } }, {new: true} );
    console.log(req.rootUser.email);
    var mailOptionsForBorrower = {
        from: 'borrow.helpers@gmail.com',
        to: req.rootUser.email,
        subject: 'Slot Booked',
        html: `<b>Thanks for choosing Helpers to borrow the book named as ${req.body.book}</b>`,
    };
    const sendEmailForBorrower= await transporter.sendMail(mailOptionsForBorrower);
    var mailOptionsForDonate = {
        from: 'borrow.helpers@gmail.com',
        to: findUser.email,
        subject: 'Your Book Chosen!!',
        html: `<b>Your ${req.body.book} book has been chosen by ${req.rootUser.name}. Please contact him/her at Mobile Number: ${req.rootUser.phone} to schedule the borrow.</b>`,
    };
    const sendEmailForDonate= await transporter.sendMail(mailOptionsForDonate);
    return res.status(201).json({message:"Successful SignIn"});
})

app.post("/create", authenticate, upload.single('myFile'), async (req, res) => {
    // console.log(req.body);
    var image = {
        data: fs.readFileSync(path.join(__dirname + '/public/' + req.file.filename)),
        contentType: 'image/png'
    }

    result = await req.rootUser.update(req.body, image);
    // result1 = await req.rootUser.update1(image);
    // console.log(req.rootUser);
    return res.status(201).send(req.rootUser);
    // result2 = await req.rootUser.update(image);
    
});

app.get('/create', authenticate, (req, res) => {
    console.log(req.rootUser);
    return res.send(req.rootUser);
})
// app.post("/upload", (req, res, next) => {
//     upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json(err)
//         } else if (err) {
//             return res.status(500).json(err)
//         }
//    return res.status(200).send(req.file)

//  })


//  });

app.get('/borrow', authenticate, async (req, res) => {
   
    const df = await signUpModel.find( { institution: req.rootUser.institution } );
    return res.send(df);
});

app.listen(port, () => console.log(`Server started listening at port ${port}`));