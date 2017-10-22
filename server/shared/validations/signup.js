import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * this function handle validation for signup form 
 * 
 * @export
 * @param {any} data 
 * @returns {void}
 */
export default function validateInput(data) {
  let errors = {};
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone field is require for message notifications';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}