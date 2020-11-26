const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

// const OrderSchema = new Schema({
//   owner: {
//        type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//   owner_id: {
//        type: Number
//     },
//     order_id: {
//        type: Number
//       },
//   totalPrice: {
//        type: Number,
//         default: 0
//     },
//   products: [{
//     product: {
//          type: Schema.Types.ObjectId,
//           ref: 'Product'
//         },
//         quantity: Number,
//         totalPrice: Number
//   }],
//   notes:{
//     type: String
//   },
//   TotalPrice:{
//     type: String
//   },
//   Created_at:{
//       type: String
//     }
// });

const OrderSchema = new Schema({
  user: {
    type: String
    },
    order_id: {
       type: Number
      },
  totalPrice: {
       type: Number,
        default: 0
    },
    Profit: {
      type: Number,
       default: 0
   },
  products: [{
    product: {
               type: Schema.Types.ObjectId,
                ref: 'Product'
              },
            quantity: Number,
           totalPrice: Number,
           total_Wholesale_price: Number
   }],
  notes:{
    type: String
  },
  Created_at:{
      type: String
    }
});

OrderSchema.plugin(deepPopulate);

module.exports = mongoose.model('Order', OrderSchema);