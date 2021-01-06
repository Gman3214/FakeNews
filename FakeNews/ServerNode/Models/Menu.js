const mongoose = require('../node_modules/mongoose')

const MenuSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    meals: {
        type: Array,
        required: true
    },
    drinks: {
        type: Array,
        required: true
    },
    background : {
        type: Object,
        required: false
    }
})

module.exports = mongoose.model('Menus', MenuSchema)