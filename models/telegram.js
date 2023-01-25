//эта модель пока не используется. Возможно будет нужна в будущем.
const mongoose = require('mongoose');

const TelegramSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    telephone: {
        type: String,
        required: true,
    },
    date: {
        type: Date
    },
    message: {
        type: String,
        minlength: 2,
        maxlength: 600,
    },
    isread: {
        type: Boolean,
        defailt: false
    },
    answer: {
        type: String,
        minlength: 2,
        maxlength: 600,
    },
    isarchive: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('telegram', TelegramSchema);