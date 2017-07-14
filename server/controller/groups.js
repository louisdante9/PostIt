const Groups = require('../models').Group;
const User = require('../models').User;
const GroupUser = require('../models').GroupUser;
module.exports = {
  create(req, res) {
    return Groups
      .create({
        name: req.body.name,
        description: req.body.description
      })
      .then((group) => {
        if (group) {
          const groupUser = {
            groupId: group.id,
            userId: req.decoded.userId,
            isAdmin: true
          }
          GroupUser.create(groupUser).then((createdGroup) => {
            if (createdGroup) {
              return res.status(201).json({
                data: group
              });
            }
            return res.status(404).json({
              message: 'Could not add user to group'
            });
          });
        } else {
          return res.status(404).json({
            message: 'Could not create group'
          });
        }
      })
      .catch(error => res.status(500).json(error));
  },


  list(req, res) {
    Groups
      .findAll({
        include: [{
          model: User,
          attributes: {exclude: ['password', 'createdAt', 'updatedAt', [GroupUser]]},
          order: [['createdAt', 'DESC']]
        }],
      })
      .then(groups => res.status(200).send(groups))
      .catch(error => res.status(400).send(error));
  },


  retrieveOneGroup(req, res) {
  return Groups
    .findById(req.params.groupId, {
      include: [{
        model: User
      }],
    })
    .then(group => {
      if (!group) {
        return res.status(404).send({
          message: 'Group Not Found',
        });
      }
      return res.status(200).send(group);
    })
    .catch(error => res.status(400).send(error));
},

updateOneGroup(req, res) {
    if (!req.body.name) {
      res.status(400).json({
        error: 'A group needs to given a name'
      });
    } else {
      models.Group.findOne({
        where: { id: req.params.id }
      }).then((group) => {
        if (group.UserId === req.user.id) {
          group.update(req.body).then(() => {
            res.status(200).json({
              success: 'Group details updated successfully.'
            });
          }).catch((err) => {
            res.status(500).json({
              message: err
            });
          });
        } else {
          res.status(401).json({
            error: 'You do not have permission to edit this group\'s details'
          });
        }
      }).catch((err) => {
        res.status(500).json(error => res.status(500).json(error));
      });
    }
  },
  /**
 * This method handles deleting a group
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  deleteOneGroup(req, res) {
    models.Group.findOne({
      where: {
        id: req.params.id
      }
    }).then((group) => {
      if (group.UserId === req.user.id) {
        group.destroy().then(() => {
          res.status(200).json({
            success: 'Group deleted successfully.'
          });
        }).catch((err) => {
          res.status(500).json({
            message: err
          });
        });
      } else {
        res.status(401).json({
          error: 'You do not have permission to delete this group'
        });
      }
    }).catch((err) => {
      res.status(500).json(error => res.status(500).json(error));
    });
  }
};