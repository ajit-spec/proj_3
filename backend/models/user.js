const mongoose = require('mongoose');
const {Schema} = mongoose;

const userschema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email is not valid']
        },
        password: {
            type: String,
            required: true,
        },
        isadmin: {
            type: Boolean,
            required: true,
            default: false
        }
    }
);

const User = mongoose.model('User', userschema);

module.exports = User