'use strict';
module.exports = (sequelize, DataTypes)=> {
  const Group = sequelize.define('Group', {
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
      associate: (models) => {
        Group.hasMany(models.Message);
        Group.belongsToMany(models.User, {
          through: 'Members',
          foreignKey: 'GroupId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Group;
};