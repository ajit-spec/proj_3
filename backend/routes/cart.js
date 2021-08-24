const express = require('express')
const router = express.Router()
const cartcontrollers = require('../controllers/cart')
const auth = require('../auth')
const utils = require('../utils')

//add product into cart
router.post(
    '/add_product_into_cart',
    auth.isauthenticated,
    cartcontrollers.add_product_into_cart
)

//add product into cart
router.post(
    '/delete_product_into_cart',
    auth.isauthenticated,
    cartcontrollers.delete_product_into_cart
)

//add product into cart
router.post(
    '/increase_qty',
    auth.isauthenticated,
    cartcontrollers.increase_qty
)

//add product into cart
router.post(
    '/decrease_qty',
    auth.isauthenticated,
    cartcontrollers.decrease_qty
)

//get_products_from_cart
router.get(
    '/get_products_from_cart',
    auth.isauthenticated,
    cartcontrollers.get_products_from_cart
)

//stripe_payment
router.post(
    '/stripe_payment',
    auth.isauthenticated,
    cartcontrollers.stripe_payment
)

module.exports = router