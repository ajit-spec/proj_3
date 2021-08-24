const express = require('express')
const router = express.Router()
const logincontrollers = require('../controllers/login')
const loginvalidators = require('../validators/login')
const validate = require('../validate')
const auth = require('../auth')
const utils = require('../utils')

//register
router.post(
    '/register',
    loginvalidators.validation_rules_for_register(),
    validate,
    logincontrollers.register
)

//login
router.post(
    '/login',
    loginvalidators.validation_rules_for_login(),
    validate,
    logincontrollers.login
)

//update user
router.put(
    '/update_user',
    auth.isauthenticated,
    loginvalidators.validation_rules_for_update_user(),
    validate,
    logincontrollers.update_user
)

//change password
router.put(
    '/change_password',
    auth.isauthenticated,
    loginvalidators.validation_rules_for_change_password(),
    validate,
    logincontrollers.change_password
)

// get user_info
router.get(
    '/get_user_info',
    auth.isauthenticated,
    logincontrollers.get_user_info
)


module.exports = router