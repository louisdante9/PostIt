import db from '../models';
// import Group from '../models';
// import User from '../models';

const Message = {

/**
 * This method handles getting one group and all it's messages
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */

 getGroupMessage(req, res) {
    db.Message.findOne({
    where: { id: req.params.id },
          include: [
            { model: models.Message,
              attributes: ['id', 'message', 'GroupId', 'createdAt', ['UserId', isadmin]],
              order: [['createdAt', 'DESC']]
            }]
    }).then((found) => {
      const currentGroup = { groupId: found.id,
        name: found.name,
        description: found.description,
        ownerId: found.UserId,
        createdAt: found.createdAt };
        res.status(200).json({
          success: 'Successful.',
          currentGroup,
          groupMessages: found.Messages
      });
    })
    .catch((error )=>{
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
    if (!req.body.message) {
      res.status(400).json({
        error: 'Message cannot be empty'
      });
    } else {
      models.Group.findOne({
        where: { id: req.params.id }
      }).then(() => {
        const newMessage = Object.assign(req.body, {
          UserId: req.user.id }, { GroupId: req.params.id });
        models.Message.create(newMessage).then((addedMessage) => {
          res.status(201).json({
            success: 'New message added successfully.',
            addedMessage
          });
        }).catch((err) => {
          res.status(500).json({
            error: err.errors[0].message
          });
        });
      });
    }
  }
} 