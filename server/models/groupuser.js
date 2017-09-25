'use strict';
export default (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN,
    unread: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        GroupUser.belongsTo(models.User, {
          foreignKey: 'userId' 
        });
        GroupUser.belongsTo(models.Group, {
          foreignKey: 'groupId' 
        });
      }
    }
  });
  return GroupUser;
};