import jwt from 'jsonwebtoken';
import db from '../models';
import UserHelper from './helpers/userHelper';
import _ from 'lodash';

require('dotenv').config({ silent: true });

const secretKey = process.env.JWT_SECRET_KEY;




const Users = {

  /**
  * Creates a new user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  signup(req, res) {
    const { username, email, password, phone } = req.body;

    db.User.find({
      where: {
        email: email
      }
    }).then((returnedUsers) => {
      if (returnedUsers) {
        return res.status(409).json({ message: `User with ${email} already exists` });
      } else {
        db.User.create(req.body).then((user) => {
          console.log(user);
          if (user) {
            const jwtData = {
              username: user.username.trim(),
              email: user.email.trim(),
              userId: user.id,
              phone: user.phone
            };

            const token = jwt.sign(jwtData, secretKey, { expiresIn: 86400 });
            user = UserHelper.transformUser(user);
            return res.status(201).json({ token, expiresIn: 86400, user });
          }
        })
          .catch(error => {
            console.log(error);
            return res.status(400).json({
              message: 'Bad request sent to the server',
              errors: handleError(error)
            });
          });
      }
    })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  /**
  * Logs a user into the api
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  login(req, res) {
    db.User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user && user.matchPassword(req.body.password)) {
        const token = jwt.sign({
          username: user.username,
          email: user.email,
          userId: user.id,
        }, secretKey, { expiresIn: 86400 });

        user = UserHelper.transformUser(user);
        return res.status(200).json({ token, expiresIn: 86400, user });
      }

      return res.status(401).json({ errors: { message: 'Failed to authenticate user' } });
    })
      .catch(error => res.status(500).json({ error }));
  },

  /**
  * Logs a user out of the api
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  logout(req, res) {
    const token = req.headers.authorization || req.headers['x-access-token'];

    if (!token) {
      return res.status(400).json({ message: 'User not logged in before' });
    }

    return res.status(200).json({ message: 'User successfully logged out' });
  },

  /**
  * Get all users
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  list(req, res) {
    const query = {};
    query.attributes = ['id', 'username', 'email',
      'createdAt', 'updatedAt'];
    query.order = [['createdAt', 'DESC']];

    db.User.findAll(query).then((result) => {
      return res.status(200)
        .json({ users: result });
    });
  },
  /**
 * serach for all users in a group
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @returns {Object} - Returns response object
 */
  search(req, res) {
    const match = req.query.name;
    const groupId = Number(req.query.groupId);
    const query = {
      where: {
        username: { $iLike: `%${match}%` },
        email: { $iLike: `%${match}%` },
      },
      attributes :['id', 'username', 'email',
      'createdAt', 'updatedAt']
    };

    db.Group.find({
      where: { id: groupId },
      include: [{
        model: db.User,
        attributes: ['id'],
        raw: true,
        through: { attributes: [] }
      }]
    }).then((group) => {
      if(!group){
        return res.status(400).json({
          message: "group doesn't exist"
        });
      }
      const omitUsers = _.map(group.toJSON().Users, 'id');//flags an error if the group is null...also return password....
      query.where.id = { $notIn: omitUsers };
      db.User.findAll(query).then((result) => {
        return res.status(200)
          .json({ users: result });
      });
    });

  },

  /**
  * Get a user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  retriveOne(req, res) {
    const userId = req.params.id;
    db.User.findById(userId).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'No user with Id found' });
      }
      user = UserHelper.transformUser(user);
      return res.status(200).json(user);
    });
  },

  /**
  * Update a user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  updateOne(req, res) {
    const userId = req.params.id;


    db.User.findById(userId).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.update(req.body).then((result) => {
        const updatedUser = UserHelper.transformUser(result);
        return res.status(200)
          .json({ user: updatedUser, message: 'user updated successfully' });
      });
    });
  },

  /**
  * Delete a user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  destroy(req, res) {
    const userId = req.params.id;
    db.User.destroy({ where: { id: userId } })
      .then((result) => {
        if (!result) {
          return res.status(404)
            .json({ message: 'No user found to delete' });
        }
        return res.status(200).json({ message: 'User successfully deleted' });
      });
  },
};

export default Users;

export function handleError(errors) {
  const result = {};
  errors.forEach(error => {
    result[error.path] = error.message;
  });

  return result;
}
