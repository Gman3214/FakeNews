const mongoose = require('mongoose')


const RUser = mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    google: {
        type: String,
        required: true
    },


 
});

module.exports = mongoose.model("RegularUsers", RUser);