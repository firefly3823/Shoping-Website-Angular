const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const cartController = require('../Controllers/cartController')
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


//add to cart
router.post('/cart/add',jwtMiddleware,cartController.addtoCartControl)
//get carts
router.get('/cart/get',jwtMiddleware,cartController.getCartControl)


// Manage quantity in cart
router.get('/cart/inc/:id',jwtMiddleware,cartController.incrementQuntityController)
router.get('/cart/dec/:id', jwtMiddleware, cartController.decrementQuntityController)
router.get('/cart/del/:id', jwtMiddleware, cartController.removeCartItem)

module.exports = router