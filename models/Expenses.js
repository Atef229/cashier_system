const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpensesSchema = new Schema({
  username: {
      type: String
    },
  cost: {
       type: Number
    },
  notes:{
    type: String
  },
  Created_at:{
      type: String
    }
});

module.exports = mongoose.model('Expenses', ExpensesSchema);