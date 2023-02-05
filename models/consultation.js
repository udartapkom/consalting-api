const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
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
    theme: {
        type: String,
        minlength: 2,
        maxlength: 300,
    },
    date: {
        type: Date,
	default: Date.now
    },
    isread: {
        type: Boolean,
        default: false
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
module.exports = mongoose.model('consultation', ConsultationSchema);