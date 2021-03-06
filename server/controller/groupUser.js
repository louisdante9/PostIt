import models from '../models';

/**
 * This methods gets all the users that are in a particular group
 * @param {object} req Request object
 * @param {object} res - A group and it's members
 * @returns {void}
 */
export default {
  /**
   * 
   * this method returns all users that belong to 
   * a particular group
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {void}
   */
  listGroupUsers(req, res) {
    return models.Group.findOne({
      where: {
        id: req.params.groupId
      }
    })
      .then((group) => {
        if (!group) {
          return res.status(404).send({
            success: false,
            message: 'Group does not exist'
          });
        }
        return models.GroupUser
          .findAll({
            where: {
              groupId: req.params.groupId
            },
            attributes: ['id', 'userId', 'groupId'],
            include: [
              {
                model: models.User,
                attributes: ['id', 'username']
              }
            ]
          })
          .then(users => {
            res.status(200).send(users);
          });
      })
      .catch(err => res.status(400).send({
        success: false,
        message: err.message
      }));
  },

  /**
     * this method adds a user to a new group
     * @param {object} req users request object
     * @param {object} res servers response
     * @return {void}
     */
  addUsersToGroup(req, res) {
    return models.Group.findOne({
      where: {
        id: req.params.groupId
      }
    })
      .then((group) => {
        if (!group) {
          return res.status(404).send({
            success: false,
            message: 'Group does not exist'
          });
        }

        return models.GroupUser.findOne({
          where: {
            userId: req.body.userId,
            groupId: req.params.groupId
          }
        })
          .then((member) => {
            if (member) {
              return res.status(409).send({
                success: false,
                message: 'User already in group'
              });
            }
            models.GroupUser.create({
              userId: req.body.userId,
              groupId: req.params.groupId
            })
              .then((addedMember) => {
                res.status(201).send({
                  success: true,
                  message: 'successfully added to group',
                  id: addedMember.id
                });
              }, err => res.status(400).send({
                success: false,
                message: err.message
              }));
          }, err => res.status(400).send({
            success: false,
            message: err.message
          }));
      }, err => res.status(400).send({
        success: false,
        message: err.message
      }));
  },
  
  /**
  * this method removes a user to a new group
  * @param {object} req users request object
  * @param {object} res servers response
  * @return {void}
   */
  removerUserFromGroup(req, res) {
    return models.Group.findOne({
      where: {
        id: req.params.groupId
      }
    })
      .then((group) => {
        if (!group) {
          return res.status(404).send({
            success: false,
            message: 'Group does not exist'
          });
        }
        return models.GroupUser.findOne({
          where: {
            userId: req.body.userId,
            groupId: req.params.groupId
          }
        })
          .then((member) => {
            if (!member) {
              return res.status(404).send({
                success: false,
                message: 'User does not belong to the group'
              });
            }
            models.GroupUser.destroy({
              where: {
                userId: req.body.userId,
                groupId: req.params.groupId
              }
            })
              .then((removeMember) => {
                res.status(200).send({
                  success: true,
                  message: 'successfully removed from group',
                  id: removeMember.id
                });
              }, err => res.status(400).send({
                success: false,
                message: err.message
              }));
          }, err => res.status(400).send({
            success: false,
            message: err.message
          }));
      }, err => res.status(400).send({
        success: false,
        message: err.message
      }));
  }
};
