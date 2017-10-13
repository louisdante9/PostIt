import db from '../models';

  /**
   * This methods gets all the users that are in a particular group
   * @param {object} req
   * @param {object} res - A group and it's members
   * @returns {void}
   */
const GroupUsers = {
  getAllUsers(req, res) {
    db.User.findAll({
      attributes: { exclude: ['password', 'updatedAt'] }
    }).then((users) => {
      res.status(200).json({
        success: 'Successful.',
        users
      });
    }).catch((err) => {
      res.status(500).json(err);
    });
  },

  /**
   * This methods gets all the users that are in a particular group
   * @param {object} req
   * @param {object} res - A group and it's members
   * @returns {void}
   */
  getUsersInGroup(req, res) {
    db.Group.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.User,
          attributes: { exclude: ['password', 'updatedAt'] },
          through: { attributes: [] }
        }
      ],
      order: [['createdAt', 'DESC']]
    }).then((found) => {
      const currentGroup = {
        groupId: found.id,
        name: found.name,
        description: found.description,
        ownerId: found.UserId,
        createdAt: found.createdAt
      };

      res.status(200).json({
        success: 'Successful.',
        currentGroup,
        groupUser: found.Users
      });
    }).catch((err) => {
      res.status(500).json(err);
    });
  },

  /**
   * This method add new users to a group
   * @param {object} req
   * @param {object} res
   * @returns {void}
   */

  addUsersToGroup(req, res) {
    db.GroupUser
      .create({
        userId: req.body.userId,
        groupId: parseInt(req.params.groupId)
      })
      .then(groupUser => res.status(201).send(groupUser))
      .catch(error => res.status(400).send(error));
   },


addUnread(req, res) {
  db.GroupUser
    .find({
      userId: req.body.userId,
      groupId: req.params.groupId
    })
    .then(groupUser => {
      groupUser.unread += 1;
      groupUser.save();
    })
    .catch(error => res.status(400).send(error));
},

};


export default GroupUsers;