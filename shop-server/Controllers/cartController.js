const carts = require('../Models/cartModel')

//add to cart

exports.addtoCartControl = async (req, res) => {
    const userId = req.payload
    const { id, title, price, description, images, quantity } = req.body
    try {
        const existingProduct = await carts.findOne({ id, userId })
        if (existingProduct) {
            existingProduct.quantity += 1
            existingProduct.grandTotal = existingProduct.quantity * existingProduct.price
            await existingProduct.save()
            res.status(200).json("Item added to your cart")
        } else {
            const newProduct = new carts({
                id, title, price, description, images,quantity,grandTotal:price, userId
            })
            await newProduct.save()
            res.status(200).json("Item added to your cart")
        }
    } catch (err) {
        console.log(err)
        res.status(401).json(err)
    }
}

//get cart controller
exports.getCartControl = async (req,res)=>{
    const userId = req.payload
    try{
        const allProduct = await cart.find({userId})
        res.status(200).json(allProduct)
    }catch(err){
        res.status(401).json(err)
    }
}