import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 * @desc this functtion handles validation for signin form
 * @param {any} inputData 
 * @returns {void}
 */
export const validateCreateGroupInput = (inputData) => {
  const errors = {};
  if (Validator.isEmpty(inputData.name)) {
    errors.name = 'Group name can not be empty';
  }
  if (Validator.isEmpty(inputData.description)) {
    errors.description = 'Group description can not be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}