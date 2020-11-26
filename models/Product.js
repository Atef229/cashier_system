const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deepPopulate = require('mongoose-deep-populate')(mongoose);

const productSchema = new Schema({

    product_id: { 
        type: Number
     },
    name: { 
        type: String
    },
    price: {
         type: Number
        },
    Wholesale_price: {
        type: Number
        },
    quantity: { 
        type: Number
    },
    image:{ 
        type: String
     },
    Created_at:{
        type: String
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  });

productSchema.index({ request: 'text' });
productSchema.plugin(deepPopulate);

module.exports = product = mongoose.model('Product', productSchema);