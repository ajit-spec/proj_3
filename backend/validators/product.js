const {body} = require('express-validator');
const Product = require('../models/product')

//add product
const validation_for_add_product = () => {
    return [
        body('name')
            .notEmpty().withMessage('name is req'),
        body('description')
            .notEmpty().withMessage('description is req'),
        body('price')
            .notEmpty().withMessage('price is req').bail()
            .isDecimal().withMessage('pls provide valid no').bail()
            .isFloat(
                {
                    min: 1,
                    max: 10000
                }
            ).withMessage('price must be between 1 and 10000')
    ]
}

module.exports = {
    validation_for_add_product
}