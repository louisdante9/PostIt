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
      msgRead: Sequelize.ARRAY(Sequelize.INTEGER),
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Groups',
          foreignKey: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          foreignKey: 'id'
        }
      },
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