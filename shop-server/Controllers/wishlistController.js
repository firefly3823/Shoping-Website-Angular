const wishlists = require('../Models/wishlistModel')

//add to wishlist

exports.addToWishlistController = async (req, res) => {
    //get product
    const userId = req.payload
    const { id, title, price, description, images, category } = req.body
    console.log(id, title, price, description, images)
    try {
        const existingProduct = await wishlists.findOne({ id, userId })
        if (existingProduct) {
            res.status(406).json("Already in wishlist")
        } else {
            const newProduct = new wishlists({
                id, title, price, description, images, userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

// get wishlists

exports.getWishllistController = async (req,res)=>{
    const userId = req.payload
    try{
        const allwish = await wishlists.find({userId})
        res.status(200).json(allwish)
    }catch(err){
        res.status(401).json(err)
    }
}

// delete wishlist

exports.removeWishlistContorller = async (req,res)=>{
    const {id}  = req.params
    try{
        const removeItem = await wishlists.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
    }catch(err){
        res.status(401).json(err)
    }
}