const express  = require('express')
const productController = require('../Controllers/productController')

const router  = new express.Router()
//get all product
router.get('/product/all',productController.getAllProducts)


module.exports= router