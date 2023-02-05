const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    titleShow: {
	type: Boolean,
	default: true
	},
    subtitle: [
        { 
            text: String,
	    textShow: {
		type: Boolean,
		default: true
	},
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