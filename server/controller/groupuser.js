import db from '../models';

/**
 * This methods gets all the users that are in a particular group
 * @param {object} req
 * @param {object} res - A group and it's members
 * @returns {void}
 */
export default {
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
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {void}
   */
  addUsersToGroup(req, res) {
    db.User
      .findById(req.body.userId)
      .then((user) => {
        if (!user) {
          return Promise.reject({
            status: 400,
            message: 'user not found'
          });
        }
        return db.Group.findById(req.params.groupId);
      })
      .then((group) => {
        if (!group) {
          return Promise.reject({
            status: 400,
            message: 'group not found'
          });
        }
        return db.GroupUser.create({
          userId: req.body.userId,
          groupId: parseInt(req.params.groupId)
        });
      })
      .then((groupUser) => {
        res.status(201).send(groupUser);
      })
      .catch(error => res.status(error.status || 500).send(error));
  },

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @return {void}
   */
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

// export default GroupUsers;