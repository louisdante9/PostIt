
/**
 * 
 * @desc this function handles an array of errors 
 * @param {any} errors 
 * @returns {void}
 */
export const handleErrors = (errors) => {
  const result = {}; 
  return errors.forEach(error => {
    result[error.path] = error.message;
  });
}