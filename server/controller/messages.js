const Message = require('../models').Message;

module.exports = {
  create(req, res) {
    return Message
      .create({
        title: req.body.name,
      })
      .then(todo => res.status(201).send(message))
      .catch(error => res.status(400).send(error));
  },
};