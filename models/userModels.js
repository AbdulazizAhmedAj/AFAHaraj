const mongoose = require("mongoose")




const userschema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
    }, 
    password: {
        type: String,
    }, 
}, { timestamps: true });

const User = mongoose.model('User', userschema);
module.exports = User