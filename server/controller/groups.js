const Group = require('../models').Group;

module.exports = {
  create(req, res) {
    return Group
      .create({
        title: req.body.name,
      })
      .then(todo => res.status(201).render(group))
      .catch(error => res.status(400).send(error));
  },
};