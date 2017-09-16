'use strict';
module.exports = function(sequelize, DataTypes) {
  const UserMessages = sequelize.define('UserMessages', {
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN,
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
      }
    }
  });
  return UserMessages;
};

