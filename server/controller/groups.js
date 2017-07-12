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
          model: User
        }],
      })
      .then(groups => res.status(200).send(groups))
      .catch(error => res.status(400).send(error));
  },
  retrieveOne(req, res) {
  return Groups
    .findById(req.params.groupId, {
      include: [{
        model: User,
        as: 'users',
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

  // list(req, res) {
  // return Group
  //   .all()
  //   .then(groups => res.status(200).send(groups))
  //   .catch(error => res.status(400).send(error));
  // },
  // list(req, res) {
  // return Group
  //   .all()
  //   .then(groups => res.status(200).send(groups))
  //   .catch(error => res.status(400).send(error));
  // },
};
