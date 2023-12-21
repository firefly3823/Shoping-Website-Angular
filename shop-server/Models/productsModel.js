const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    id:{
        type:Number,
        required:true,
        unique:true
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }, 
    images: {
        type: [String],
    }, 
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'category'
    },

})

const products = mongoose.model("products",productSchema)

module.exports = products