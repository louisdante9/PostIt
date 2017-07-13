'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flag: {
      type: Sequelize.ENUM,
      values: ['normal', 'urgent', 'critical']

      },
      message: Sequelize.TEXT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
     
  }),
  
  down:(queryInterface, Sequelize) => queryInterface.dropTable('Messages')
};