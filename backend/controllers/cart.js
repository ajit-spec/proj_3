require('dotenv').config()
const Cart = require('../models/cart')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//add product into cart
const add_product_into_cart = async (req, res) => {

    const product_id = req.body.product_id;

    const cart = await Cart.findOne(
        {user_id: req.user._id}
    )

    if (!cart) {
        const x = new Cart(
            {
                user_id: req.user._id,
                products: [{
                    qty: 1,
                    product_id
                }]

            }
        )

        await x.save()
        return res.json(
            {
                status: 1,
                msg: 'product added into cart'
            }
        )
    }

    const result = cart.products.find(value => value.product_id.equals(product_id))
    if (result) {
        return res.json(
            {
                status: 0,
                msg: 'product already added into the cart'
            }
        )
    }

    cart.products.push({product_id, qty: 1})
    await cart.save()
    return res.json(
        {
            status: 1,
            msg: 'product added into cart'
        }
    )


}

//delete product into cart
const delete_product_into_cart = async (req, res) => {
    const product_id = req.body.product_id;

    await Cart.findOneAndUpdate(
        {
            user_id: req.user._id
        },
        {
            $pull: {
                products: {
                    product_id
                }
            }
        }
    )

    return res.json(
        {
            status: 1,
            msg: 'product removed from cart'
        }
    )

}

//increase_qty
const increase_qty = async (req, res) => {
    const product_id = req.body.product_id;

    const cart = await Cart.findOne(
        {
            user_id: req.user._id
        }
    )

    const index = cart.products.findIndex(value => value.product_id.equals(product_id))
    const product = cart.products.find(value => value.product_id.equals(product_id))


    cart.products.splice(
        index,
        1,
        {
            product_id: product.product_id,
            qty: (product.qty + 1)
        }
    )

    await cart.save();
    return res.json(
        {
            status: 1,
            msg: 'quantity increase'
        }
    )

}


//decrease_qty
const decrease_qty = async (req, res) => {
    const product_id = req.body.product_id;

    const cart = await Cart.findOne(
        {
            user_id: req.user._id
        }
    )

    const index = cart.products.findIndex(value => value.product_id.equals(product_id))
    const product = cart.products.find(value => value.product_id.equals(product_id))

    if (product.qty <= 1) {
        return res.json(
            {
                status: 0,
                msg: 'qty cant be less than 1'
            }
        )
    }

    cart.products.splice(
        index,
        1,
        {
            product_id: product.product_id,
            qty: (product.qty - 1)
        }
    )

    await cart.save();
    return res.json(
        {
            status: 1,
            msg: 'quantity decrease'
        }
    )

}

//get_products_from_cart
const get_products_from_cart = async (req, res) => {
    const cart = await Cart.findOne(
        {user_id: req.user._id}
    )

    if (!cart) {
        return res.json(
            {
                status: 0,
                msg: 'no cart found'
            }
        )
    }

    if (cart.products.length === 0) {
        return res.json(
            {
                status: 0,
                msg: 'cart is empty'
            }
        )
    }

    const result = await Cart.findById(cart._id).populate(
        {
            path: 'products_list',
        }
    )


    return res.json(
        {
            status: 1,
            products_list: result.products_list.map((value, index) => {
                return (
                    {
                        ...value.toObject(),
                        qty: result.products[index].qty
                    }

                )
            })
        }
    )


}


//stripe_payment
const stripe_payment = async (req, res) => {

    const cart = await Cart.findOne(
        {
            user_id: req.user._id
        }
    ).populate(
        {
            path: 'products_list',
        }
    )

    const result = cart.products_list.map((value, index) => {
        return (
            {
                ...value.toObject(),
                qty: cart.products[index].qty
            }

        )
    })

    let total_amt = 0;
    result.forEach((value, index) => {
        total_amt += value.qty * value.price
    })


    const name = req.body.name;
    const location = req.body.location;
    const email = req.body.email;
    const phone = req.body.phone;
    const token_id = req.body.token_id;

    const charge = await stripe.charges.create({
        amount: total_amt * 100,
        currency: 'inr',
        source: token_id,
        description: 'product payment',
        receipt_email: email,
        shipping: {
            address: {
                state: location
            },
            name,
            phone
        },
    }, async (error, charge) => {
        if (error) {
            return res.json(
                {
                    status: 0,
                    msg: error.message
                }
            )
        }

        await Cart.findOneAndUpdate(
            {
                user_id: req.user._id
            },
            {
                products: []
            }
        )

        return res.json(
            {
                status: 1,
                msg: 'payment success'
            }
        )
    });

}


module.exports = {
    add_product_into_cart,
    delete_product_into_cart,
    increase_qty,
    decrease_qty,
    get_products_from_cart,
    stripe_payment
}