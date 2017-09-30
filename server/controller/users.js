import jwt from 'jsonwebtoken';
import _ from 'lodash';
// import bcrypt from 'bcrypt';
import generator from 'generate-password';
import crypto from 'crypto';
import { passwordResetMail,resetSuccessfulResetMail } from './helpers/mailer';
import db from '../models';
import UserHelper from './helpers/userHelper';


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
        $or:[
          {email: email},
          {username: username}
        ]
      }
    }).then((returnedUsers) => {
      if (returnedUsers) {
        return res.status(409).json({ message: `User with "${email}" or "${username}" already exists` });
      } else {
        db.User.create(req.body).then((user) => {
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
    const offset = req.query.offset * 5;
    const query = {
      where: {
        username: { $iLike: `%${match}%` },
        email: { $iLike: `%${match}%` },
      },
      attributes :['id', 'username', 'email',
      'createdAt', 'updatedAt'],
      limit: 5,
      offset: offset
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
      db.User.findAndCountAll(query).then((result) => {
        return res.status(200)
          .json({ 
            users: result,
            pageCount: Math.ceil(result.count/5)
          });
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

  /**
  * request reset password
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */

requestnewpassword(req, res) {
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
                return res.status(200).send({ message: "password updated succesfully"});

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
  resetpassword(req, res) {
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
          console.log(Date.now());
          console.log(user.expiryTime);
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
            req.body.confirmPassword && (req.body.newPassword === req.body.confirmPassword)) {
              
            user.update({
              // password: bcrypt.hashSync(req.body.newPassword.trim(), 10),
              password: req.body.newPassword,
              resetPasswordToken: null,
              expiryTime: null
            })
              .then((updatedUser) => {
                console.log(updatedUser);
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

  /**
  * Reacover user password
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  
  updatePassword(req, res) {
    const { email } = req.body;
    db.User.findOne({
      where: {
        email: email
      }
    }).then((result) => {
      if(result){
        //generate password and update database then send mail to the user 
        const pass = generator.generate({
          length: 8,
          numbers: true
      });
      console.log(pass, '========> this is the password');

      const password = bcrypt.hashSync(pass.trim(), 10);

      console.log(password, '========> this is the result');
     
      db.User.update({
        password,
      }, {
        where: {
          email
        }
      }).then(() => {
       //send mail and update user 
       passwordResetMail(email, pass);
        return res.status(200).send({ message: "password updated succesfully"});
      });
     
       }
      else{
         //send a response message to the user email doesnt exist
         return res.status(404).send({err:'email not found'});
         
        }
    }).catch((error) => {
      return res.status(500).json(error);
    });
  },

};


export function handleError(error) {
  const result = {};
  error.errors.forEach(err => {
    result[err.path] = err.message;
  });
  
  return result;
}

export default Users;
