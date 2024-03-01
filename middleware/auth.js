const jwt = require("jsonwebtoken");
const User= require("../Models/User");

const auth = async(req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user= await user.findOne({
            _id: decoded._id,
        })

        if(!user){
            throw new Error("Unable to Login, Invalid Credentials");
        }

        req.user= user;
        req.token = token;

        next();
    }
    catch(error){
        res.status(401).send({error:error.message});
    }
}