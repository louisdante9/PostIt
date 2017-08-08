'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messeages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupId: {
      type: Sequelize.INTEGER,
      allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING
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
  
  down:(queryInterface, Sequelize) => queryInterface.dropTable('Messeages')
};