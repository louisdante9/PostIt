

export const handleErrors = (errors) => {
  const result = {}; 
  return errors.forEach(error => {
    result[error.path] = error.message;
  });
}