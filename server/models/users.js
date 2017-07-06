'use strict';
module.exports = (sequelize, DataTypes) =>{
  const User = sequelize.define('User', {
  
    username: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9\_\-]+$/i,
      }
  },
  
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
  },
  }, {
    classMethods: {
      associate: (models)=> {
        User.belongsToMany(models.Group, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          through: "UserGroup",
        });
         User.hasMany(models.Message, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return User;
};