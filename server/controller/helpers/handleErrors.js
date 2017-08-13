export function handleError(errors) {
    const result = {}; 
    errors.forEach(error => {
      result[error.path] = error.message;
    });
}