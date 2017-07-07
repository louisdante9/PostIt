'use strict';
module.exports = (sequelize, DataTypes)=> {
  var Group = sequelize.define('Group', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
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