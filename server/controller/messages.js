import db from '../models';
import { handleError } from './helpers/handleErrors';
import mailer from './helpers/mailer';
import smsSender from './helpers/smsHelper';
import pry from 'pryjs';
import { io } from '../app';


function sendMessage(data, flag) {
  switch (flag) {
    case 'urgent':
      mailer(data);
      break;
    case 'critical':
      mailer(data);
      smsSender(data);
      break;
    default:
      break;
  }
}



const Messages = {

  /**
   * This method handles getting one group and all it's messages
   * @param {object} req
   * @param {object} res
   * @returns {void}
   */

  getGroupMessage(req, res) {
    const userId = req.decoded.userId;
    const groupId = req.params.groupId;
    if (req.query.read) {
      getAllUnreadMessage(userId, groupId)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
      db.Group.find({
        where: { id: req.params.groupId },
      }).then((group) => {
        if (!group) {
          return res.status(400).json({
            error: 'bad request'
          });
        }

        db.Message.findAll({
          where: { groupId: req.params.groupId },
          include: [{
            model: db.User,
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']]
          },
        ],
          order: [['createdAt', 'ASC']]
        }).then((messages) => {
          res.status(200).json({
            messages,
            UserMessages: messages[0].User.UserMessages
          });
        });
      })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    }
  },


  /**
   * This method handles posting messages to member groups
   * @param {object} req
   * @param {object} res
   * @returns {void}
   */

  createNewMessage(req, res, Mailer) {
    db.Group.findById(req.params.groupId).then((group) => {
      if (group) {
        const newMessage = {
          message: req.body.message,
          userId: req.decoded.userId,
          flag: req.body.flag,
          groupId: group.id
        };
        
        db.Message.create(newMessage).then((addedMessage) => {
          res.status(201).json(addedMessage);
          db.GroupUser.findAll({
            where: { groupId: req.params.groupId },
            include: [
              { model: db.Group, required: true, attributes: ['name'] },
              { model: db.User, required: true, attributes: ['username', 'phone', 'email'] }
            ],
            raw: true
          }).then((data) => {
            sendMessage(data, addedMessage.flag);
            const msgData = generateUserMessageData(data, req.decoded.userId, addedMessage.id);   
            createUnreadMessages(msgData).then(e => {}).catch(() => {})      
          });
        }).catch((err) => {
          return res.status(400).json({
            message: 'Bad Request',
            err: handleError(err)
          });
        });
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

function generateUserMessageData(data, userId) {
  return data.map(metadata => {
    const value =  {
      read: false,
      userId: metadata.userId,
      groupId: metadata.groupId,
      // messageId
    };
    if(value.userId !== userId) {
      return value;
    }
    return Object.assign({}, value, { read: true});
  });
}


function createUnreadMessages(data) {
  console.log(data)
  return db.UserMessages.bulkCreate(data);
}

function getAllUnreadMessage(userId, groupId) {
  return db.GroupUser.findAll({
    where: { userId },
    include: [
      {
        model: db.Group,
        include: [{
          model: db.UserMessages,
          where: { userId: userId, read: false }
        }]
     }]
  });
}