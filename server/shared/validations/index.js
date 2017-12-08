import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 * this functtion handles validation for signin form
 * 
 * @export
 * @param {any} inputData 
 * @returns {void}
 */
export const validateSigninFormInput = (inputData) => {  
  let errors ={};
  if (Validator.isEmpty(inputData.email)) {
    errors.email = 'Email field is required';
  }
  if (Validator.isEmpty(inputData.password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
/**
 * 
 * this function handle validation for signup form 
 * 
 * @export
 * @param {any} inputData 
 * @returns {void}
 */
export const validateSignupFormInput = (inputData) => {
  let errors = {};
  if (Validator.isEmpty(inputData.username)) {
    errors.username = 'Username field is required';
  }
  if (Validator.isEmpty(inputData.email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(inputData.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(inputData.password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(inputData.phone)) {
    errors.phone = 'Phone field is require for message notifications';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
/**
 * 
 * this function handle validation for forgot password form
 * 
 * @export
 * @param {any} inputData 
 * @returns {void}
 */
export const validateForgotPasswordInput = (inputData) => {
  let errors = {};
  if (Validator.isEmpty(inputData.email)) {
    errors.email = 'Email field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
/**
 * 
 * this function handle validation for change password form
 * 
 * @export
 * @param {any} inputData 
 * @returns {void}
 */
export default function validateChangePasswordInput(inputData) {
  let errors = {};
  if (Validator.isEmpty(inputData.newPassword)) {
    errors.email = 'Email field is required';
  }
  if (Validator.isEmpty(inputData.confirmPassword)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}