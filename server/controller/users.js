import jwt from 'jsonwebtoken';
import generator from 'generate-password';
import crypto from 'crypto';
import { passwordResetMail, resetSuccessfulResetMail } from './helpers/mailer';
import models from '../models';
import paginate from '../shared/paginate';
import UserHelper from './helpers/userHelper';
require('dotenv').config({ silent: true });

const secretKey = process.env.JWT_SECRET_KEY;
export default {

  /**
  * this method creates a new user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  signup(req, res) {
    const { username, email, password, phone } = req.body;
    models.User.find({
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
      return models.User.create(req.body).then((user) => {
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
  * this method authenticates a user for access into the application
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  login(req, res) {
    models.User.findOne({ where: { email: req.body.email } }).then((user) => {
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
 * this method serach for all users in a group
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @returns {Object} - Returns response object
 */
  searchUsers(req, res) {
    let{ offset, limit } = req.query;
    // validate request object
    if (!req.query.name) {
      return res.status(404).send({
        success: false,
        message: 'no search parameter/limit',
      });
    }
    if(!limit) {
      limit = 5
      return limit;
    }
    return models.User
    .findAndCountAll({
      offset:offset * limit,
      limit: limit,
      where: {
        username: { $ilike: `%${req.query.name}%` }
      },
      attributes: ['id', 'username']
    })
    .then((users) => {
      res.status(200).send({
        success: true,
        users,
        data: paginate(users.count, limit, offset * 5)
      });
    }, (err) => {
      res.status(400).send({
        success: false,
        message: 'an error occured searching users',
        error: err.message,
      });
    });
  },
  
  /**
  * this method requests for a change of password 
  * and also send a mail for token authentication
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
      return models.User
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
            models.User.update({
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
                  { 
                    message: "password updated succesfully",
                    token
                }
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
  * this method reset password
  * @param {Object} - req Request object
  * @param {Object} - res Response object
  * @returns {Object} - Returns response object
  */
  resetPassword(req, res) {
    return models.User
      .findOne({
        where: {
          resetPasswordToken: req.params.token
        }
      })
      .then((user) => {
        if (!user) {
          res.status(401).send({
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
export const handleError = error => {
  const result = {};
  error.errors.forEach(err => {
    result[err.path] = err.message;
  });

  return result;
}
