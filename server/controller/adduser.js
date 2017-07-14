import Groups from '../models/group';
import User from '../models/user';
import GroupUser from '../models/groupuser';

module.exports = {
    getAllUsers(req, res) {
        models.User.findAll({
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
        models.Group.findOne({
        where: { id: req.params.id },
        include: [
            { model: models.User,
            attributes: { exclude: ['password', 'updatedAt'] },
            through: { attributes: [] } }
        ],
        order: [['createdAt', 'DESC']]
        }).then((found) => {
        const currentGroup = { groupId: found.id,
            name: found.name,
            description: found.description,
            ownerId: found.UserId,
            createdAt: found.createdAt };

        res.status(200).json({
            success: 'Successful.',
            currentGroup,
            groupMembers: found.Users
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
    const idToAdd = Number(req.body.idToAdd);
    models.Group.findOne({
      where: {
        id: req.params.id
      }
    }).then((group) => {
      if (group.UserId === req.user.dataValues.id) {
        models.UserGroup.findOrCreate({
          where: { $and: {
            GroupId: req.params.id,
            UserId: idToAdd
          } },
          defaults: {
            GroupId: req.params.id,
            UserId: idToAdd
          }
        });
        res.status(201).json({
          success: 'Successful.',
        });
      } else {
        res.status(400).json({
          error: 'You are not allowed to add new users to this group, please contact admin!'
        });
      }
    }).catch((err) => {
      res.status(500).json(err);
    });
  }
}