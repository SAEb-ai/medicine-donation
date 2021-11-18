const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/helpers', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
.then(() => console.log("Database Connected"))
.catch((err) => console.error(err));