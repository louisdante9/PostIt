import db from '../models';

/**
 * This methods gets all the users that are in a particular group
 * @param {object} req
 * @param {object} res - A group and it's members
 * @returns {void}
 */
export default {

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns {void}
   */
  listGroupUsers(req, res) {
    return db.Group.findOne({
      where: {
        id: req.params.groupId
      }
    })
      .then((group) => {
        if (!group) {
          return res.status(400).send({
            success: false,
            message: 'Group does not exist'
          });
        }
        return db.GroupUser
          .findAll({
            where: {
              groupId: req.params.groupId
            },
            attributes: ['id', 'userId', 'groupId'],
            include: [
              {
                model: db.User,
                attributes: ['id', 'username']
              }
            ]
          })
          .then(users => res.status(200).send(users));
      })
      .catch(err => res.status(400).send({
        success: false,
        message: err.message
      }));
  },
  

  /**
   * This method add new users to a group
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {void}
   */
  // addUsersToGroup(req, res) {
  //   db.User
  //     .findById(req.body.userId)
  //     .then((user) => {
  //       if (!user) {
  //         return Promise.reject({
  //           status: 400,
  //           message: 'user not found'
  //         });
  //       }
  //       return db.Group.findById(req.params.groupId);
  //     })
  //     .then((group) => {
  //       if (!group) {
  //         return Promise.reject({
  //           status: 400,
  //           message: 'group not found'
  //         });
  //       }
  //       return db.GroupUser.create({
  //         userId: req.body.userId,
  //         groupId: parseInt(req.params.groupId)
  //       });
  //     })
  //     .then((groupUser) => {
  //       res.status(201).send(groupUser);
  //     })
  //     .catch(error => res.status(error.status || 500).send(error));
  // },
/**
   * add a user to a new group
   * @param {object} req users request object
   * @param {object} res servers response
   * @return {void}
   */
  addUsersToGroup(req, res) {
        return db.Group.findOne({
          where: {
            id: req.params.groupId
          }
        })
        .then((group) => {
          if (!group) {
            return res.status(400).send({
              success: false,
              message: 'Group does not exist'
            });
          }

          return db.GroupUser.findOne({
            where: {
              userId: req.body.userId,
              groupId: req.params.groupId
            }
          })
          .then((member) => {
            if (member) {
              return res.status(401).send({
                success: false,
                message: 'User already in group'
              });
            }
            db.GroupUser.create({
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
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @return {void}
   */
  addUnread(req, res) {
    db.GroupUser
      .find({
        userId: req.body.userId,
        groupId: req.params.groupId
      })
      .then(groupUser => {
        groupUser.unread += 1;
        groupUser.save();
      })
      .catch(error => res.status(400).send(error));
  },
};

// export default GroupUsers;