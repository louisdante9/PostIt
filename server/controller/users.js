import jwt from 'jsonwebtoken';
import _ from 'lodash';
import generator from 'generate-password';
import crypto from 'crypto';
import { passwordResetMail, resetSuccessfulResetMail } from './helpers/mailer';
import db from '../models';
import UserHelper from './helpers/userHelper';
require('dotenv').config({ silent: true });

const secretKey = process.env.JWT_SECRET_KEY;
export default {

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
        $or: [
          { email },
          { username }
        ]
      }
    }).then((returnedUsers) => {
      if (returnedUsers) {
        return res.status(409).json({
          status: 409,
          message: `User with "${email}" or "${username}" already exists`
        });
      }
      return db.User.create(req.body).then((user) => {
        const jwtData = {
          username: user.username,
          userId: user.id,
        };
        const token = jwt.sign(jwtData, secretKey, { expiresIn: 86400 });
        user = UserHelper.transformUser(user);
        return res.status(201).json({
          status: 201,
          expiresIn: 86400,
          token,
          user
        });
      })
        .catch(error => {
          return res.status(400).json({
            status: 400,
            message: 'Bad request sent to the server',
            errors: handleError(error)
          });
        });
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
          userId: user.id,
        }, secretKey, { expiresIn: 86400 });
        user = UserHelper.transformUser(user);
        return res.status(200).json({
          token,
          expiresIn: 86400,
          user
        });
      }
      return res.status(401).json({
        errors:
        { message: 'Failed to authenticate user' }
      });
    })
      .catch(error => res.status(500).json({ error }));
  },

/**
 * serach for all users in a group
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @returns {Object} - Returns response object
 */

  //remmeber to work on this
  search(req, res) {
    const match = req.query.name;
    const groupId = Number(req.query.groupId);
    const { offset, limit } = req.query;

    let query = {
      where: {
        $or: [{ username: { $iLike: `%${match}%` } },
        { email: { $iLike: `%${match}%` } }],
      },
      attributes: ['id', 'username', 'email',
        'createdAt', 'updatedAt'],
      include: [{
        model: db.Group,
        attributes: ['id'],
        through: { attributes: [] }
      }]
    };
    if (offset && limit) {
      query = { ...query, offset, limit };
    }
    // db.User.find
    // db.Group.find({
    //   where: { id: groupId },
    //   include: [{
    //     model: db.User,
    //     attributes: ['id'],
    //     raw: true,
    //     through: { attributes: [] }
    //   }]
    // }).then((group) => {
    //   if(!group){
    //     return res.status(400).json({
    //       message: "group doesn't exist"
    //     });
    //   }
    //flags an error if the group is null...also return password.
    // const omitUsers = group.toJSON().Users.map(user => user.id);
    // query.where.id = { $notIn: omitUsers };
    db.User.findAndCountAll(query).then((result) => {
      return res.status(200)
        .json({
          users: result,
          pageCount: Math.ceil(result.count / 5)
        });
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
          .json({
            user: updatedUser,
            message: 'user updated successfully'
          });
      });
    });
  },

  /**
  * request reset password
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  requestNewPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      res.status(401).send({
        err: 'Please provide your email'
      });
    } else {
      return db.User
        .findOne({
          where: {
            email: email
          }
        })
        .then((user) => {
          if (!user) {
            res.status(404).send({
              err: 'Account associated with this email not found'
            });
          } else {
            const token = crypto.randomBytes(20).toString('hex');
            db.User.update({
              resetPasswordToken: token,
              expiryTime: Date.now() + 3600000
            }, {
                where: {
                  email: email
                }
              })
              .then(() => {
                passwordResetMail(email, token, req.headers.host);
                return res.status(200).send(
                  { message: "password updated succesfully" }
                );

              }, (err) => {
                res.status(400).send({
                  success: false,
                  message: err.message
                });
              });
          }
        }, (err) => {
          res.status(500).send({
            success: false,
            message: err.message
          });
        });
    }
  },

  /**
  * reset password
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  resetPassword(req, res) {
    return db.User
      .findOne({
        where: {
          resetPasswordToken: req.params.token
        }
      })
      .then((user) => {
        if (!user) {
          res.status(400).send({
            success: false,
            err: 'failed token authentication'
          });
        } else {
          if ((Date.now()) > user.expiryTime) {
            user.update({
              resetPasswordToken: null,
              expiryTime: null
            }, {
                where: {
                  resetPasswordToken: req.params.token
                }
              })
              .then(() => {
                res.status(400).send({ err: false });
              }, err => res.status(400).send(err.message));
          } else if (req.body.newPassword &&
            req.body.confirmPassword &&
            (req.body.newPassword === req.body.confirmPassword)) {
            user.update({
              password: req.body.newPassword,
              resetPasswordToken: null,
              expiryTime: null
            })
              .then((updatedUser) => {
                resetSuccessfulResetMail(updatedUser.email);
                res.status(201).send({
                  success: true,
                  message: 'successfully updated password'
                });
              }, (err) => {
                res.status(400).send({
                  success: false,
                  err: err.message
                });
              });
          } else {
            res.status(400).send({
              success: false,
              err: 'invalid passwords'
            });
          }
        }
      }, (err) => {
        res.status(400).send({
          success: false,
          err: err.message
        });
      });
  },
};

/**
  * reset password
  * @param {Object} error
  * @returns {Array} - Returns an array
  */
export function handleError(error) {
  const result = {};
  error.errors.forEach(err => {
    result[err.path] = err.message;
  });

  return result;
}

// export default Users;
