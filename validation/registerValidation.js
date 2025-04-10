

const Validation = async(req,res, next) =>{

    try {
        const {firstName,lastName,Sex,email,password,phoneNumber} = req.body

        const errors = []
    
        if(!email){
            errors.push("Email is required")
        }else if(!validateEmail(email)){
            errors.push("email is invalid")
        }
        if(password.length <= 6){
            errors.push("password must be more than 6 characters")
        }
    
        if(errors.length > 0){
           return res.status(400).json({message:errors})
        }
        
        next()
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}



const loginValidation = (req,res,next) =>{
    try {
        const {email, password} = req.body

        const errors = []
        if(!email){
            errors.push ("email is required")
        }else if(!validateEmail(email)){
            errors.push("email is invalid")
        }
    
        if(!password){
            errors.push("password required")
        }
    
        if(errors.length > 0){
            res.status(400).json({message: errors})
        }
        next()
    } catch (error) {
        res.status(500).json({message: error.message})
    }
   
}

function validateEmail(email) {

    const emailPattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    
    return emailPattern.test(String(email).toLocaleLowerCase());
    
    }
   
module.exports = {
    Validation,
    loginValidation,
    // validateEmail
}