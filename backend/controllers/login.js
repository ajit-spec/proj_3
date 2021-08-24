const User = require('../models/user')
const bcrypt = require('bcrypt')
const utils = require('../utils')

//register
const register = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const isadmin = req.body?.isadmin;
    const password = await bcrypt.hash(req.body.password, 10)

    const user = new User(
        {
            name,
            email,
            password,
            isadmin
        }
    )

    await user.save()
    res.send(
        {
            status: 1,
            msg: 'user registered success'
        }
    )
}

//login
const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const result = await User.findOne(
        {email}
    )

    if (!result) {
        return res.json(
            {
                status: 0,
                msg: 'wrong credentails'
            }
        )
    }

    if (
        !(await bcrypt.compare(password, result.password))
    ) {
        return res.json(
            {
                status: 0,
                msg: 'wrong credentails'
            }
        )
    }

    const token = await utils.generate_token({
        _id: result._id,
        name: result.name,
        email: result.email,
        isadmin: result.isadmin
    })

    return res.json(
        {
            status: 1,
            msg: 'login success',
            token
        }
    )


}

//update user
const update_user = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        req.body
    )
    return res.json(
        {
            status: 1,
            msg: 'user details updated'
        }
    )
}

//change password
const change_password = async (req, res) => {
    const new_password = req.body.new_password;
    await User.findByIdAndUpdate(
        req.user._id,
        {
            password: await bcrypt.hash(new_password, 10)
        }
    )
    return res.json(
        {
            status: 1,
            msg: 'password  updated'
        }
    )
}


//get user_info
const get_user_info = async (req, res) => {
    const {password, ...others} = req.user.toObject()
    res.json(
        {
            status: 1,
            data: others
        }
    )
}

module.exports = {
    register,
    login,
    update_user,
    change_password,
    get_user_info,
}