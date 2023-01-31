const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    title: {
        type: String
    },
    subtitle: [
        { 
            text: String,
            service: [
                {
                    name: String,
                    cost: String
                }
            ]
        }
    ]
})
module.exports = mongoose.model('price', PriceSchema);