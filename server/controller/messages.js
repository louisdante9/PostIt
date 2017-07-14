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
    db.Message.findOne({
      where: { id: req.params.groupId },
      // include: [
      //   { model: db.Message
      //   }
      // ],
      order: [['createdAt', 'DESC']]
    }).then((messages) => {
        res.status(200).json({
         messages
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
    db.Group.findById(req.params.groupId).then((group) => {
      if (group) {
        const newMessage = {
          message: req.body.message,
          userId: req.decoded.userId,
          groupId: group.id
        };
        db.Message.create(newMessage).then((addedMessage) => {
          res.status(201).json({
            success: 'New message has been added successfully.',
            addedMessage
          });
        })
      } else {
        return res.status(404).json({
          message: 'No such group found'
        })
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
  }
}

export default Messages;