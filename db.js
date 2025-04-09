const mongoose = require("mongoose")

const mongoDB = () => {
    mongoose.connect(`${process.env.MONGOOSE_URL}`)
    .then(() => {
        console.log('mongoose connected...')
    })
}

module.exports = mongoDB