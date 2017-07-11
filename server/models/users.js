'use strict';

import bcrypt from 'bcrypt-nodejs';

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
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: "Email address must be valid"
           },
      len: {
        args: [6, 128],
        msg: "Email address must be between 6 and 128 characters in length"
      },
    }
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [4, 100],
        msg: 'Your password is too short'
      }
    }
  },
  }, {
      classMethods: {
      associate: (models) => {
        User.hasMany(models.Message);
        User.hasMany(models.Group, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
        User.belongsToMany(models.Group, {
          through: 'Members',
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    },
     instanceMethods: {

      /**
       * compare the input password with the hashed password stored
       * @param {String} password
       * @returns {Boolean} true or false
       */
      matchPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      /**
       * hashes the password before storing
       * @param {String} password
       * @returns {void} no return
       */
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
      }
    },
    hooks: {
      beforeCreate(user) {
        user.hashPassword()
      },

      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return User;
};