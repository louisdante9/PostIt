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
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return attributes;
  },
}
export default UserHelper;