'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    models.User.hasMany(models.Argument, {
      onDelete: "CASCADE",
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    });
  };
  return User;
};