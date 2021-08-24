const mongoose = require('mongoose');
const {Schema} = mongoose;

const productschema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: [1, 'The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).'],
            max: [10000, 'The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).']
        }
    }
);

const Product = mongoose.model('Product', productschema);

module.exports = Product