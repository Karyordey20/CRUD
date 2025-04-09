const express = require("express")
const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt")
const userModel= require("./models/autModel")
const mongoDB = require("./db")
const {Validation} = require("./validation/registerValidation")
const app = express()
app.use(express.json())
mongoDB()
userModel()



const PORT = process.env.PORT|| 8000
app.listen(PORT, () =>{
    console.log(`server connected at ${PORT}`)
})

app.get("/", (req,res) => {
    res.status(200).json({message:'Sucessful'})
})

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

        res.status(200).json({message:"Successsful", newUser})

    } catch (error) {
        res.status(400).json({message:error.message})
    }

})