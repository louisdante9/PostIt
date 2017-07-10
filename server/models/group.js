'use strict';
module.exports = (sequelize, DataTypes)=> {
  var Group = sequelize.define('Group', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Name can not be empty'
        }
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'description can not be empty'
        }
      }
    },
  },
  
   {
    classMethods: {
      associate: function(models) {
        Group.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        Group.hasMany(models.Message, {
          foreignKey: 'groupId',
          
        });
      }
    }
  });
  return Group;
};