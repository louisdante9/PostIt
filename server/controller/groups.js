import models from "../models";
import validateInput from "../middleware/validate";

export default {

  /**
   * this method creates a group 
   * 
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {void}
   */
  create(req, res) {
    const { errors, isValid } = validateInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      models.Group.findOne({
        where: {
          name: req.body.name
        }
      }).then((found) => {
        if (found) {
          return res.status(409).json({
            status: 409,
            err: 'Oops! A group already exists with the same name'
          });
        }
        return models.Group
          .create({
            name: req.body.name,
            userId: req.decoded.userId,
            description: req.body.description
          })
          .then(group => {
            if (group) {
              const groupUser = {
                groupId: group.id,
                userId: req.decoded.userId,
                isAdmin: true
              };
              models.GroupUser.create(groupUser).then(createdGroup => {
                if (createdGroup) {
                  return res.status(201).json({
                    data: group
                  });
                }
                return res.status(400).json({
                  message: "Sorry an error occured while adding user to group"
                });
              });
            } else {
              return res.status(400).json({
                message: "Sorry an error occured while creating your group"
              });
            }
          });
      })
        .catch(error => res.status(500).json(error));
    }
  },

  /**
   * 
   * this method list the group created by users 
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @return {void}
   */
  list(req, res) {
    models.Group
      .findAll({
        include: [{
          model: models.User,
          where: { id: req.decoded.userId },
          attributes: { exclude: ["password"] },
          order: [["createdAt", "DESC"]]
        }],
      })
      .then(groups => res.status(200).send(groups))
      .catch(error => res.status(400).send(error));
  },
};