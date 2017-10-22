import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 * this functtion handles validation for signin form
 * @export
 * @param {any} data 
 * @returns {void}
 */
export default function validateInput(data) {  
  let errors ={};
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}