const mongoose = require('../node_modules/mongoose')

const DrinkSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    subcatagory: {
        type: Array,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Drinks', DrinkSchema)