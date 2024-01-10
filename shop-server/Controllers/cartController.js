const cart = require('../Models/cartModel')
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
            res.status(200).json(`${existingProduct.quantity}:- ${existingProduct.title} Added to cart`)
        } else {
            const newProduct = new carts({
                id, title, price, description, images,quantity,grandTotal:price, userId
            })
            await newProduct.save()
            res.status(200).json(`${existingProduct.title} Added to cart`)
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
        const allProduct = await carts.find({userId})
        res.status(200).json(allProduct)
    }catch(err){
        res.status(401).json(err)
    }
}

//CART Manage

exports.incrementQuntityController = async(req,res)=>{
    const {id}= req.params
    try{
        const selectedProduct = await carts.findOne({_id:id})
        if (selectedProduct) {
            selectedProduct.quantity +=1
            selectedProduct.grandTotal = selectedProduct.quantity*selectedProduct.price
            await selectedProduct.save()
            res.status(200).json(`Added ${selectedProduct.quantity} of ${selectedProduct.title}'`)
        } else {
            res.status(400).json('Product not found')
        }
    }catch(err){
        res.status(400).json(err)
    }
}

exports.decrementQuntityController = async (req, res) => {
    const { id } = req.params
    try {
        const selectedProduct = await carts.findOne({ _id: id })
        if (selectedProduct) {
            selectedProduct.quantity -= 1
            if (selectedProduct.quantity==0) {
                await carts.deleteOne({_id:id})
                res.status(200).json(`${selectedProduct.title} Removed from cart`)
            }else{
                selectedProduct.grandTotal = selectedProduct.quantity * selectedProduct.price
                await selectedProduct.save()
                res.status(200).json(`Removed 1 of ${selectedProduct.title} From cart`)
            }
        } else {
            res.status(400).json('Product not found')
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.removeCartItem = async (req,res)=>{
    const {id} = req.params
    try{
        const selectedProduct = await carts.findOne({ _id: id })
        if(selectedProduct){
            await carts.deleteOne({_id:id})
            res.status(200).json(`${selectedProduct.title} Removed from cart`)
        }else{
            res.status(400).json('Product not found')
        }

    }catch(err){
        res.status(400).json(err)
    }
}
