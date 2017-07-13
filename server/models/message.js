'use strict';
module.exports = (sequelize, DataTypes)=> {
  const Message = sequelize.define('Message', {
    flag: {
      type: DataTypes.ENUM,
      values: ['normal', 'urgent', 'critical'],
      defaultValue: 'normal',
      validate: {
        isIn: {
          args: [['normal', 'urgent', 'critical']],
          msg: 'Flag value must be one of: normal, urgent or critical'
        }
      }

    },
    message:{
      type: DataTypes.TEXT,
      allowNull: false,
       validate: {
        notEmpty: {
          args: true,
          msg: 'Message field cannot be empty'
        }
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.Group, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE',
        });
        Message.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Message;
};