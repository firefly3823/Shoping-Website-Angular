const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const wishListController = require('../Controllers/wishlistController')

const router = new express.Router()
//get all product
router.get('/product/all', productController.getAllProducts)


//register
router.post('/user/register', userController.registerController)

//Login
router.post('/user/login', userController.loginController)

//product details
router.get('/product/get/:id',productController.getProductDetails)

// wishlist
router.post('/wishlist/add',jwtMiddleware,wishListController.addToWishlistController)

//get wish
router.get('/wishlist/get',jwtMiddleware,wishListController.getWishllistController)

// remove wishlist
router.delete('/wishlist/remove/:id', jwtMiddleware, wishListController.removeWishlistContorller)

module.exports = router