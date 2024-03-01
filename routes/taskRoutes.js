const express= require("express");
const auth = require("../middleware/auth")
const Task = require("../Models/task")
const router=express.Router();

router.get('/', (req, res)=>{
   res.json({
    message: "Task routes are working",
    user:req.user
   })
})
//CRUD Tasks

router.post('/createtask', auth, async (req, res)=>{
    try{
        //description, owner
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });
        await task.save();
        res.status(201).json({task, message:"Task Created Successfully"})
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
})

module.exports=router;