const jwt = require("jsonwebtoken")
const userModel = require("../models/autModel")


const validateToken = async (req, res, next) =>{

   try {
     const getToken = req.header("Authorization")
     if(!getToken){
        return res.status(401).json({message:"Unauthorized access"})
     }
     const realToken = getToken.split(" ")
     const token = realToken[1]
     const decode =  jwt.verify (token, process.env.ACCESS_TOKEN )
     if(!decode){
        return res.status(401).json({message:"Access Denied"})
     }
    //const getUser = await userModel.findOne({email:decode.user.email}) //we can use email to find user
    const getUser = await userModel.findOne({id:decode.user.id})  //we can also use id to find users
     
        if(!getUser){
            return res.status(404).json({message:"User not found"})
        }
     req.getUser = getUser  
   } catch (error) {
     res.status(500).json({message:error.message})
   }
   next()
}
module.exports = validateToken