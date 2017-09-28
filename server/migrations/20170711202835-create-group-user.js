'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GroupUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          foreignKey: 'id',
          model: 'Groups'
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          foreignKey: 'id',
          model: 'Users'
        }
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      unread: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GroupUsers');
  }
};