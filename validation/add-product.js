const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddInput(data) {
  let errors = {};

  data.product_id = !isEmpty(data.product_id) ? data.product_id : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.Wholesale_price = !isEmpty(data.Wholesale_price) ? data.Wholesale_price : '';
  data.quantity = !isEmpty(data.quantity) ? data.quantity : '';

  if (Validator.isEmpty(data.product_id)) {
    errors.product_id = 'Product Id field is required';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }


  if (Validator.isEmpty(data.price)) {
    errors.price = 'Price field is required';
  }

  if (Validator.isEmpty(data.Wholesale_price)) {
    errors.Wholesale_price = 'Wholesale price field is required';
  }

  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = 'َQuantity field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};