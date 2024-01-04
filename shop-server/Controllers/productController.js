const products = require('../Models/productsModel')

exports.getAllProducts = async (req,res)=>{
    try{
        const allproducts = await products.find()
        res.status(200).json(allproducts)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getProductDetails = async (req,res)=>{
    const {id} = req.params
    try{
        const product = await products.findOne({id})
        res.status(200).json(product)

    }catch(err){
        res.status(401).json(err)
    }
}