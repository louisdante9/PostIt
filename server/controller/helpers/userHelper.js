/**
 * Helper methods for Users
 */
const UserHelper = {
  /**
   * @desc transform Users result from query
   * @param {Object} user response object containing response
   * @returns {Object} transformed user attributes
   */
  transformUser(user) {
    const attributes = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return attributes;
  },
};

export function handleErrors(errors) {
  errors.map(error => error.message);
}

export function handleError(errors) {
  const result = {}; 
  errors.forEach(error => {
    result[error.path] = error.message;
  });

  return result;
}

export default UserHelper;
