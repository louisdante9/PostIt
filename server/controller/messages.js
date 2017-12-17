import pry from 'pryjs';
import models from '../models';
import { handleErrors } from './helpers/handleErrors';
import mailer from './helpers/mailer';
import smsHelper from './helpers/smsHelper';
import { io } from '../app';

/**
 * sendMessage, this is a helper method for sending messages 
 * @param {Object} emailData
 * @param {Object} flag Response object
 * @returns {void}
 */
const sendMessage = (emailData, flag) => {
  switch (flag) {
    case 'urgent':
      mailer(emailData);
      break;
    case 'critical':
      mailer(emailData);
      smsHelper(emailData);
      break;
    default:
      break;
  }
};

const Messages = {

  /**
   * This method handles getting one group and all it's messages
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {void}
   */
  getGroupMessage(req, res) {
    const { userId } = req.decoded.userId;
    const { groupId } = req.params.groupId;
    models.Group.find({
      where: { id: req.params.groupId },
    }).then((group) => {
      if (!group) {
        return res.status(404).json({
          error: 'bad request'
        });
      }
      models.Message.findAll({
        where: { groupId: req.params.groupId },
        include: [{
          model: models.User,
          attributes: { exclude: ['password'] },
          order: [['createdAt', 'DESC']]
        },
        ],
        order: [['createdAt', 'ASC']]
      }).then((messages) => {
        res.status(200).json({
          messages,
        });
      });
    })
      .catch((error) => res.status(500).json({ error }));
  },

  /**
   * This method handles posting messages to member groups
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @param {function} Mailer
   * @returns {void}
   */
  createNewMessage(req, res, Mailer) {
    models.Group.findById(req.params.groupId).then((group) => {
      if (group) {
        const newMessage = {
          message: req.body.message,
          userId: req.decoded.userId,
          flag: req.body.flag,
          groupId: group.id
        };
        models.Message.create(newMessage).then((addedMessage) => {
          res.status(201).json(addedMessage);
          models.GroupUser.findAll({
            where: { groupId: req.params.groupId },
            include: [
              { model: models.Group, required: true, attributes: ['name'] },
              {
                model: models.User, 
                required: true,
                attributes: ['username', 'phone', 'email']
              }
            ],
            raw: true
          }).then((messsaageData) => {
            sendMessage(messsaageData, addedMessage.flag);
            const msgData = generateUserMessageData(
              messsaageData,
              req.decoded.userId, addedMessage.id
            );
            createUnreadMessages(msgData).then(e => { }).catch(() => { });
          });
        }).catch((err) => res.status(400).json({
          message: 'Bad Request',
          err: handleErrors(err)
        }));
      } else {
        return res.status(404).json({
          message: 'No such group found'
        });
      }
    })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
};

export default Messages;

/**
  * generateUserMessageData
  * @description this function is a helper function for create new message method 
  * @param {integer} userMsgData
  * @param {integer} userId
  * @returns {Object} - Returns an object
  */
const generateUserMessageData = (userMsgData, userId) => userMsgData.map(metadata => {
  const value = {
    read: false,
    userId: metadata.userId,
    groupId: metadata.groupId,
  };
  if (value.userId !== userId) {
    return value;
  }
  return {
    ...value, 
    read: true 
  };
});

/**
  * createUnreadMessages
  * @description this is a helper function to check users that read a message
  * @param {integer} data
  * @returns {Object} - Returns an object
  */
const createUnreadMessages = data => models.UserMessages.bulkCreate(data);

/**
  * getAllUnreadMessage
  * this is a helper function that gets all 
  * users that haven't read their messages
  * @function
  * @param {integer} userId, 
  * @param {integer} groupId
  * @returns {Object} - Returns an object
  */
// const getAllUnreadMessage = (userId, groupId) => models.GroupUser.findAll({
//   where: { userId },
//   include: [
//     {
//       model: models.Group,
//       include: [{
//         model: models.UserMessages,
//         where: {
//           userId, 
//           read: false
//         }
//       }]
//     }]
// });