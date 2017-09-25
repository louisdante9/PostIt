import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
      
  let errors ={};

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}