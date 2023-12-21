const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const router = new express.Router()
//get all product
router.get('/product/all', productController.getAllProducts)

//register
router.post('/user/register', userController.registerController)

//Login
router.post('/user/login', userController.loginController)


module.exports = router