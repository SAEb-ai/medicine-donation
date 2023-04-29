const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://shahbaz:Shahbaz@01@cluster0.pcjul.mongodb.net/Helpers?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error(err));
