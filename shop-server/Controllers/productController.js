const products = require('../Models/productsModel')

exports.getAllProducts = async (req,res)=>{
    try{
        const allproducts = await products.find()
        res.status(200).json(allproducts)
    }catch(err){
        res.status(401).json(err)
    }
}