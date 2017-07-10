import jwt from 'jsonwebtoken';
import db from '../models';
import UserHelper from './helpers/UserHelper';

require('dotenv').config({ silent: true});


const secretKey = process.env.JWT_SECRET_KEY;

const Users = {
  /**
  * Creates a new user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  signup(req, res) {
    db.User.findOne({
      where: {
         email: req.body.email 
      }
    }).then((returnedUsers) => {
      if (returnedUsers) {
      return res.status(409).json({ message: `User with ${req.body.email} already exists` });
      }
      db.User.create(req.body).then((user) => {
        console.log(user);
        const jwtData = {
          username: user.username,
          email: user.email,
          userId: user.id
        };

        const token = jwt.sign(jwtData, secretKey, { expiresIn: 86400 });
        user = UserHelper.transformUser(user);
        return res.status(201).json({ token, expiresIn: 86400, user });
      });
    })
    .catch((error )=>{
      console.log(error);
      return res.status(500).json({error})
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

      return res.status(401).json({ message: 'Failed to authenticate user' });
    })
    .catch(error => res.status(500).json({error}));
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
  findAll(req, res) {
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
  * Get a user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  findOne(req, res) {
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
  remove(req, res) {
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