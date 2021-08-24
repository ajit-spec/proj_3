require('dotenv').config()
const Product = require('../models/product')
const utils = require('../utils')
const multer = require('multer')

//add product
const add_product = async (req, res) => {

    console.log(req.body)

    const product = new Product(
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        }
    )

    try {
        await product.save()
        return res.json(
            {
                status: 1,
                msg: 'new product added'
            }
        )
    } catch (e) {
        console.log(e.message)
    }

}

//delete product
const delete_product = async (req, res) => {
    const product_id = req.body.product_id

    const result = await Product.findByIdAndDelete(product_id)
    return res.json(
        {
            status: 1,
            msg: 'product deleted'
        }
    )

}

//edit product
const edit_product = async (req, res) => {
    const product_id = req.body.product_id

    const result = await Product.findByIdAndUpdate(product_id, req.body)
    return res.json(
        {
            status: 1,
            msg: 'product edited'
        }
    )

}

//get products
const get_products = async (req, res) => {
    const result = await Product.find({})
    return res.json(
        {
            status: 1,
            products: result
        }
    )
}

//get single product
const get_single_product = async (req, res) => {
    const product_id = req.body.product_id;
    const result = await Product.findById(product_id)
    return res.json(
        {
            status: 1,
            product: result
        }
    )
}


module.exports = {
    add_product,
    delete_product,
    edit_product,
    get_products,
    get_single_product
}