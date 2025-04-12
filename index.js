const express = require("express")
const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt")
const userModel= require("./models/autModel")
const mongoDB = require("./db")
const {Validation, loginValidation} = require("./validation/registerValidation")
const jwt = require("jsonwebtoken")
const validateToken = require("./validation/tokenValidation")
const emailValidate = require("./emailValidation/validateEmail")
const app = express()
app.use(express.json())
mongoDB()
userModel()
const PORT = process.env.PORT|| 8000


//port listening
app.listen(PORT, () =>{
    console.log(`server connected at ${PORT}`)
})

//welcome message
app.get("/", (req,res) => {
    res.status(200).json({message:'Sucessful'})
})

//registration
app.post("/register",Validation, async (req,res) => {
    try {
        const {firstName,lastName,Sex,email,password,phoneNumber} = req.body

        // if(!email){
        //     return res.status(400).json({message:"email require"})
        // }
        // if(password.length <= 6){
        //     return res.status(400).json({message:"password must be more than six characters"})
        // }

        const existing = await userModel.findOne({email})
        if(existing){
            return res.status(400).json({message:"user existed"})
        }
        const crypt = await bcrypt.hash(password,12)

        const newUser =  new userModel({firstName,lastName,Sex,email,password: crypt,phoneNumber})
        await newUser.save()

        await emailValidate(email)

        res.status(200).json({message:"Successsful", newUser})

    } catch (error) {
        res.status(500).json({message:error.message})
    }

})

//login in
app.post("/login",loginValidation, async (req,res) =>{
   try {
    const {email, password} = req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    const checkPassword = await bcrypt.compare(password, user.password)
   
    if(!checkPassword){
        return res.status(400).json({message:"email or password incorrect"})
    }

    const acessToken =  jwt.sign({user},`${process.env.ACCESS_TOKEN}`,{expiresIn:"20m"})

    res.status(200).json(
        {message:"login successful", 
              acessToken, 
              user
        }
         )
    
   } catch (error) {
    res.status(500).json({message: error.message})
   }
})


//gettting one user with email
app.get(("/user"), async (req,res) =>{
   try {
     const {email} = req.body
 
     const getUser = await userModel.findOne({email})
 
     if(!getUser){
         return res.status(404).json({message:"user not found"})
     }
 
     res.status(200).json({getUser})
   } catch (error) {
     res.status(500).json({message:error.message})
   }
})


///deleting all users

app.delete(("/deleteAll"), async (req,res)=>{
    // const {email} = req.body
    const deleteAllUsers = await userModel.deleteMany()

    res.status(200).json({message:"all user delete"})
})


//route for tken validation

app.post(("/auth"), validateToken, (req,res) => {

    res.status(200).json({message: "successful",  user: req.getUser})
})