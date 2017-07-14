'use strict';
module.exports = function(sequelize, DataTypes) {
  var GroupUser = sequelize.define('GroupUser', {
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return GroupUser;
};