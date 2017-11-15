// import validator from 'express-validator';

// const validate = {
//   validateLogin(req, res) {
//     req
//       .checkBody("email", "Enter a valid email address.")
//       .isEmail();
//     req
//       .checkBody("password", "Password can't be empty.")
//       .notEmpty();
//   },

//   validateSignup(req, res) {
//     req
//       .checkBody("firstname", "First name cannot be empty.")
//       .notEmpty();
//     req
//       .checkBody("lastname", "Last name cannot be empty.")
//       .notEmpty();
//     req
//       .checkBody("email", "Enter a valid email address.")
//       .isEmail();
//     req
//       .checkBody("phone", "Phone number can't be empty.")
//       .notEmpty();
//     req
//       .checkBody("password", "Password can't be empty.")
//       .notEmpty();      
//   },

//   validateCreateGroup(req, res) {
//     req
//       .checkBody("name", "Group name can't be empty.")
//       .notEmpty();
//     req
//       .checkBody("description", "Group description can not be empty.")
//       .notEmpty();
//   },

//   validateId(id, req, res) {
//       if (isNaN(id)) {
//         return false;
//       } else { 
//         return true; 
//       }
//   }

// };

// export default validate;
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