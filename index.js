const express= require('express');
const bodyParser= require('body-parser');
const app = express();
require('dotenv').config();
require('./db');
const userRoutes= require('./routes/userRoutes')
const taskRoutes= require('./routes/taskRoutes')
const PORT=process.env.PORT;



app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res)=>{
    res.json({
        message:"Task Manager API is Working!"
    })
})
app.listen(PORT, ()=>{
    console.log(`server is up on port ${PORT}`)
});
