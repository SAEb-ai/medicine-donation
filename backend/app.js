require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();
const nodemailer = require("nodemailer");
const db = require("./db/connection");
const signUpModel = require("./models/siginup-model");
const authenticate = require("./middleware/authenticate");
const cookieParser = require("cookie-parser");
var fs = require("fs");
var path = require("path");
const port = process.env.PORT || 8080;
var bodyParser = require("body-parser");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "borrow.helpers@gmail.com",
    pass: process.env.password,
  },
});

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS
app.use(cors({ origin: ["https://medicine-donation.onrender.com"] }));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

// POST request to /sign-in
app.post("/sign-in", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz fill the data" });
    }
    const findUser = await signUpModel.findOne({ email: req.body.email });

    if (!findUser) {
      return res.status(400).json({ error: "Please Sign Up first" });
    }
    const isMatched = await bcrypt.compare(password, findUser.password);
    if (!isMatched) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    token = await findUser.generateAuthToken();
    console.log(token);

    res.cookie("jwttoken", token, {
      expires: new Date(Date.now() + 20000000),
      httpOnly: true,
    });
    return res.status(201).json({ message: "Successful SignIn" });
  } catch (err) {
    console.log(err);
  }
});

// POST request to /sign-up
app.post("/sign-up", async (req, res) => {
  try {
    const findUser = await signUpModel.findOne({ email: req.body.email });
    if (findUser) {
      return res.status(422).json({ error: "Account already created" });
    }
    const user = new signUpModel(req.body);

    const userDataSaved = await user.save();
    if (userDataSaved) {
      return res.status(201).json({ message: "Successful SingUp" });
    }
  } catch (err) {
    console.log(err);
  }
});

//POST request to /todo
app.post("/todo", authenticate, (req, res) => {
  const { perform } = req.body;
  if (!perform) {
    return res.status(400).json({ error: "Plz fill the data" });
  }
  res.end();
});

// GET request to /logout
app.get("/logout", (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("User Logout");
});

//POST request to /delete
app.post("/delete", authenticate, async (req, res) => {
  console.log(req.body.book);
  const findUser = await signUpModel.findOne({
    $and: [{ "lBooks.lbook": req.body.book }, { "lBooks.ltime": req.body.time }],
  });

  const findUser1 = await signUpModel.findOneAndUpdate(
    { "lBooks.ltime": req.body.time },
    { $pull: { lBooks: { lbook: req.body.book, ltime: req.body.time } } },
    { new: true },
  );
  console.log(findUser);
  var mailOptionsForBorrower = {
    from: "borrow.helpers@gmail.com",
    to: req.rootUser.email,
    subject: "Slot Booked",
    html: `<b>Thanks for choosing Medicine Donation to borrow the medicine named as ${req.body.book}</b>`,
  };
  const sendEmailForBorrower = await transporter.sendMail(mailOptionsForBorrower);
  var mailOptionsForDonate = {
    from: "borrow.helpers@gmail.com",
    to: findUser.email,
    subject: "Your Medicine Chosen!!",
    html: `<b>Your ${req.body.book} medicine has been chosen by ${req.rootUser.name}. Please contact him/her at Mobile Number: ${req.rootUser.phone} to schedule the borrow.</b>`,
  };
  const sendEmailForDonate = await transporter.sendMail(mailOptionsForDonate);
  return res.status(201).json({ message: "Successful SignIn" });
});

//POST request to /create
app.post("/create", authenticate, upload.single("myFile"), async (req, res) => {
  var image = {
    data: fs.readFileSync(path.join(__dirname + "/public/" + req.file.filename)),
    contentType: "image/png",
  };

  result = await req.rootUser.update(req.body, image);
  return res.status(201).send(req.rootUser);
});

//GET request to /create
app.get("/create", authenticate, (req, res) => {
  console.log(req.rootUser);
  return res.send(req.rootUser);
});

//GET request to /borrow
app.get("/borrow", authenticate, async (req, res) => {
  const df = await signUpModel.find({ institution: req.rootUser.institution });
  return res.send(df);
});

app.listen(port, () => console.log(`Server started listening at port ${port}`));
