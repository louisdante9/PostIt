import db from '../models';
// import Group from '../models';
// import User from '../models';

const Messages = {

/**
 * This method handles getting one group and all it's messages
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */

 getGroupMessage(req, res) {
    db.Group.findOne({
      where: { id: req.params.groupId },
      include: [
        { model: db.Message,
          include:[db.User],
        }
      ],
      order: [['createdAt', 'DESC']]
    }).then((found) => {
        res.status(200).json({
          success: 'Successful.', 
          found
      });
    })
    .catch((error )=>{
      console.log(error);
      return res.status(500).json({error})
    });
  },

  
/**
 * This method handles posting messages to member groups
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */

  createNewMessage(req, res) {  
    db.Group.findOne({
      where: { id: req.params.id }
      }).then(() => {
        const newMessage = {
          message: req.body.message,
          userId: req.decoded.userId,
          groupId: req.params.groupId
        };
        db.Message.create(newMessage).then((addedMessage) => {
          res.status(201).json({
            success: 'New message has been added successfully.',
            addedMessage
          });
        }).catch((err) => {
          res.status(500).json(error);
        });
    });
  }
} 

export default Messages;