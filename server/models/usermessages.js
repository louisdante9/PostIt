'use strict';
module.exports = function(sequelize, DataTypes) {
  const UserMessages = sequelize.define('UserMessages', {
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    read: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        UserMessages.belongsTo(models.User, {
          foreignKey: 'userId' 
        });
        UserMessages.belongsTo(models.Group, {
          foreignKey: 'groupId' 
        });
        UserMessages.belongsTo(models.Message, {
          foreignKey: 'messageId' 
        });
      }
    }
  });
  return UserMessages;
};

