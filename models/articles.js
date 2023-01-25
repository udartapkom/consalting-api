const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    subtitle: [
        {
            id: Number,
            text: String,
            about: String,
            price: Number
        }
    ]

})
module.exports = mongoose.model('article', ArticleSchema);