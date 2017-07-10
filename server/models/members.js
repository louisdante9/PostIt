'use strict';
module.exports = function(sequelize, DataTypes) {
  var members = sequelize.define('members', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return members;
};