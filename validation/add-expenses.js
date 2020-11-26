const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddInput(data) {
  let errors = {};

  data.cost = !isEmpty(data.cost) ? data.cost : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';

  if (Validator.isEmpty(data.cost)) {
    errors.cost = 'Cost field is required';
  }

  if (Validator.isEmpty(data.notes)) {
    errors.notes = 'notes field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};