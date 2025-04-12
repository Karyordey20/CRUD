
const nodemailer = require("nodemailer")

const emailValidate = async(userEmail) =>{
    
    try {
        const emailModel =  nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:  process.env.Email,
                pass: process.env.PASSWORD,
            }
        })
    
        const sendDetails = {
            from : process.env.Email,
            to: userEmail,
            subject: "welcome to youthrive",
            body:`<p>hello</p>`
        }
        
        await emailModel.sendMail(sendDetails)
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = emailValidate