const mongoose = require('../node_modules/mongoose')


const BUser = mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    permissionlevel: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    restaurants: {
        type: Array,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    billingaddress: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model("businessusers", BUser);