
export const handleError = (errors) => {
    const result = {}; 
    return errors.forEach(error => {
      result[error.path] = error.message;
    });
}