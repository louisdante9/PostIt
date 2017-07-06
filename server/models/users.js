'use strict';
module.exports = (sequelize, DataTypes) =>{
  var users = sequelize.define('users', {
    title: DataTypes.STRING,
    username: {
    type: Sequelize.STRING,
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
        // associations can be defined here
        
      }
    }
  });
  return users;
};