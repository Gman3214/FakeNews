const mongoose = require('../node_modules/mongoose')

const RestaurantSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    geo_location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    menu: {
        type: Object,
        required: false
    },
    icon: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Restaurants', RestaurantSchema)