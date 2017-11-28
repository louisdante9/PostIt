// import Validator from 'validator';
import models from "../models";
import validateInput from "../middleware/validate";
// import validateInput from "../shared/validations/signin";

export default {

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns {void}
   */
  create(req, res) {
    const {errors, isValid} = validateInput(req.body);
    if(!isValid) {
      res.status(400).json(errors);
    }else{
    models.Group.findOne({
      where:{
        name: req.body.name
      }
    }).then((found)=>{
      if(found){
        return  res.status(409).json({
          status: 409,
          err: 'Group name already taken'
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
            return res.status(404).json({
              message: "Could not add user to group"
            });
          });
        } else {
          return res.status(404).json({
            message: "Could not create group"
          });
        }
      });
    })
      .catch(error => res.status(500).json(error));
    }
  },
    
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @return {void}
   */
  list(req, res) {
    models.Group
      .findAll({
        include: [{
          model: models.User,
          where: { id: req.decoded.userId },
          attributes: { exclude: ["password"]},
          order: [["createdAt", "DESC"]]
        }],
      })
      .then(groups => res.status(200).send(groups))
      .catch(error => res.status(400).send(error));
  },
};