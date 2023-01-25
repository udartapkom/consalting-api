const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    image: {
        type: String
    }
})
module.exports = mongoose.model('feedback', FeedbackSchema);