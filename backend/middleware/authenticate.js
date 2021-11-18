const jwt = require("jsonwebtoken");
const user = require('../models/siginup-model');
const authenticate = async(req, res, next) => {
    try {
        
        const token = req.cookies.jwttoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await user.findOne({_id:verifyToken._id, "tokens.token":token});
        if(!rootUser) {
            throw new Error("User Not Found");
        }
        req.token = token;
        req.rootUser = rootUser;
        next();

    }
    catch(err) {
        res.status(400).send("Token not given");
        console.log(err);
    }
};

module.exports =authenticate;