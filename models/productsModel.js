const mongoose = require("mongoose")
//posts schema
const produtSchema = new mongoose.Schema({
    user : {
      type : mongoose.Types.ObjectId , ref : "User"
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    }
}, { timestamps: true });

const Products = mongoose.model('Products', produtSchema);
module.exports = Products