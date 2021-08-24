const express = require('express')
const router = express.Router()
const productcontrollers = require('../controllers/product')
const productvalidators = require('../validators/product')
const validate = require('../validate')
const auth = require('../auth')
const utils = require('../utils')

//add product
router.post(
    '/add_product',
    auth.isauthenticated,
    auth.adminauth,
    productvalidators.validation_for_add_product(),
    validate,
    productcontrollers.add_product
)

//delete product
router.post(
    '/delete_product',
    auth.isauthenticated,
    auth.adminauth,
    productcontrollers.delete_product
)

//edit product
router.post(
    '/edit_product',
    auth.isauthenticated,
    auth.adminauth,
    productvalidators.validation_for_add_product(),
    validate,
    productcontrollers.edit_product
)

//get products
router.get(
    '/get_products',
    auth.isauthenticated,
    productcontrollers.get_products
)

//get single product
router.post(
    '/get_single_product',
    auth.isauthenticated,
    productcontrollers.get_single_product
)


module.exports = router