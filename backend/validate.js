const {validationResult} = require('express-validator')

const validate = async (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

    const error_object = extractedErrors[0]


    return res.json({
        status: 0,
        msg: error_object[Object.keys(error_object)[0]],
    })
}

module.exports = validate