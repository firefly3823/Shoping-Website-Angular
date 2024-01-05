const mongoose = require('mongoose')
const wishlistSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
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
    userId: {
        type: String,
        required: true
    }
})
const wishlists = mongoose.model('wishlists', wishlistSchema)
module.exports = wishlists