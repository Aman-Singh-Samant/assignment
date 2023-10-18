import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors'
import User from './models/user.model.js'
dotenv.config()


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

mongoose.connect('mongodb+srv://user:user@ass.c57eepf.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
        console.log(err);
})


const app= express()

app.use(cors(corsOptions)) // Use this after the variable declaration

//allow json to be send in server
app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running on port 3000 da')
})

app.get("/",(req,res)=>(
    res.send([
        {id:1,title:"book"}
    ])
));
app.use('/api/user',userRouter)
app.use('/api',authRouter)
app.get('/api/auth/get',(req,res)=>{
    User.find()
    .then(users=> res.json(users))
    .catch(err => res.json(err))
})
//Middleware for throwing error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error da"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
