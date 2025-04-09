

const Validation = async(req,res, next) =>{
    const {firstName,lastName,Sex,email,password,phoneNumber} = req.body

    const errors = []

    if(!email){
        errors.push("Email is required")
    }
    if(password.length <= 6){
        errors.push("password must be more than 6 characters")
    }

    if(errors.length > 0){
        res.status(400).json({message:errors})
    }
    
    next()
}
module.exports = {
    Validation
}