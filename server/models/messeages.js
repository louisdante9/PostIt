'use strict';
module.exports = (sequelize, DataTypes)=> {
  const Message = sequelize.define('Message', {
    flag: {
      type: DataTypes.ENUM,
      values: ['normal', 'urgent', 'critical']

    },
    message:{
      type: DataTypes.TEXT,
      allowNull: false,
       validate: {
        is: /^[a-z0-9\_\-]+$/i,
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