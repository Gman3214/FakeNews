const mongoose = require('../node_modules/mongoose');
const { array } = require('@hapi/joi');

const MealSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    average_wait : {
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
    extras: {
        type: Array,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Meals', MealSchema);