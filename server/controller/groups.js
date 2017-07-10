const Groups = require('../models').Group;
const User = require('../models').User;
module.exports = {
  create(req, res) {
    return Groups
      .create({
        name: req.body.name,
        description: req.body.description
      })
      .then(group => res.status(201).json(group))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
  return Groups
    .findAll({
      include: [{
      model: User,
      as: 'users',
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
