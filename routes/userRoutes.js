const express= require("express");
const User= require("../Models/User");

const router=express.Router();
const bcrypt= require("bcrypt")
const jwt = require('jsonwebtoken')


router.get('/', (req, res)=>{
    res.send('User routes are working!')
})

router.post('/register', async(req, res)=>{
    const {name, email, password} = req.body;
    try{
        const user= await User.create({name, email, password});
        await user.save();
        res.status(201).send({user, message:'User Created Successfuly'})
    }
    catch(err){
        res.status(400).send({error:err});
    }
})

router.post('/login', async(req, res)=>{
    try{
    const {email, password}= req.body;
    const user= await User.findOne({email});

    if(!user){
        throw new Error("Unable to login, user not found")
    }
    
    const isMatch= await bcrypt.compare(password, user.password);
        
    if(!isMatch){
            throw new Error('Unable to login, invalid password');
          
    }

    const token = jwt.sign({
           _id: user._id.toString()
       }, process.env.JWT_SECRET_KEY);
    
       res.send({user, token, message:'Logged in Successfully'});
              
}
catch(err){
    res.status(400).send({error:err});
   }


})

module.exports=router;