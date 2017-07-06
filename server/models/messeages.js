'use strict';
module.exports = (sequelize, DataTypes)=> {
  const Message = sequelize.define('Message', {
  
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    flag: {
      type: DataTypes.ENUM,
      values: ['normal', 'urgent', 'critical']

    },
    message: DataTypes.TEXT
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