'use strict';
module.exports = (sequelize, DataTypes)=> {
  var Group = sequelize.define('Group', {
  
    name: DataTypes.STRING,
  },
   {
    classMethods: {
      associate: function(models) {
        Group.belongsToMany(models.User, {
          foreignKey: 'groupId',
          through: "UserGroup"
        });
        Group.hasMany(models.Message, {
          foreignKey: 'groupId',
          
        });
      }
    }
  });
  return Group;
};