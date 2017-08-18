import models from '../models';

export default {
  create(req, res) {
    // console.log('sjvhfashfd=====', req.decoded)
    return models.Group
      .create({
        name: req.body.name,
        userId: req.decoded.userId,
        description: req.body.description
      })
      .then((group) => {
        if (group) {
          // console.log(group);
          const groupUser = {
            groupId: group.id,
            userId: req.decoded.userId,
            isAdmin: true
          };
          
          models.GroupUser.create(groupUser).then((createdGroup) => {
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
    models.Group
      .findAll({
        include: [{
          model: models.User,
          where: { id: req.decoded.userId },
          attributes: { exclude: ['password']},
          order: [['createdAt', 'DESC']]
        }],
      })
      .then(groups => res.status(200).send(groups))
      .catch(error => res.status(400).send(error));
  },
 

  retrieveOneGroup(req, res) {
  return models.Group
    .findById(req.params.groupId)
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