'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('UserMessages', {
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
      messageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          foreignKey: 'id',
          model: 'Messages'
        }
      },
      read: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserMessages');
  }
};