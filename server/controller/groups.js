const Group = require('../models').Group;

module.exports = {
  create(req, res) {
    return Group
      .create({
        name: req.body.name,
      })
      .then(group => res.status(201).json(group))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
  return Group
    .all()
    .then(groups => res.status(200).send(groups))
    .catch(error => res.status(400).send(error));
  },
};
