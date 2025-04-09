const mongoose = require("mongoose")

const userSchmea = new mongoose.Schema({
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    Sex:{type:String},
    email:{type:String},
    password:{type:String, require:true},
    phoneNumber:{type:Number, require:true}
},
{
    timestamps:true
})

const userModel = new mongoose.model("User", userSchmea)

module.exports = userModel