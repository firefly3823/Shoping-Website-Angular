const wishlists = require('../Models/wishlistModel')

//add to wishlist

exports.addToWishlistController = async (req,res)=>{
    //get product

    const {id} = req.params
    const userId = req.payload
    try{
        const existingProduct = await wishlists.findOne({productId:id,userId})
        if (existingProduct) {
            res.status(406).json("Already in wishlist")
        } else {
            const newProduct = new wishlists({
                productId:id,userId
            })
            await newProduct.save()
        }
    } catch(err){
        res.status(401).json(err)
    }
}