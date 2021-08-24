const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartschema = new Schema(
    {
        products: [
            {
                qty: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: [1, 'qty cannot be less than 1']
                },
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
            }
        ],
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);


cartschema.virtual('products_list', {
    ref: 'Product', //The Model to use
    localField: 'products.product_id', //Find in Model, where localField
    foreignField: '_id', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
cartschema.set('toObject', {virtuals: true});
cartschema.set('toJSON', {virtuals: true});


const Cart = mongoose.model('Cart', cartschema);

module.exports = Cart