const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const ReturnedSchema = new Schema({
  owner: {
       type: Schema.Types.ObjectId,
        ref: 'User'
    },
  order_id: {
       type: Number
    },
    products: [{
      product: {
           type: Schema.Types.ObjectId,
            ref: 'Product'
          },
      quantity: {
           type: Number,
            default: 1 
          }
    }],
  totalPrice:{
    type: Number
  },
  Created_at:{
      type: String
    }
});

ReturnedSchema.plugin(deepPopulate);
module.exports = mongoose.model('Returned', ReturnedSchema);