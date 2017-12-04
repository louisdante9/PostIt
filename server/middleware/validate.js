import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 * this functtion handles validation for signin form
 * @export
 * @param {any} data 
 * @returns {void}
 */
const validateInput = (data) => {
  let errors = {};
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Group name can not be empty';
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Group description can not be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
export default validateInput;