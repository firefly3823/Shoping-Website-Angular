const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
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
    quantity:{
        type:Number,
        required:true
    },
    grandTotal:{
        type:Number,
        required:true
    },
    userId: {
        type: String,
        required: true
    }
})
const cart = mongoose.model('cart', cartSchema)
module.exports = cart