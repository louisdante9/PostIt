import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
      
  let errors ={};

  if (Validator.isEmpty(data.newPassword)) {
    errors.email = 'Email field is required';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}