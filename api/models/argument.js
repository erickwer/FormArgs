'use strict';
module.exports = (sequelize, DataTypes) => {
  const Argument = sequelize.define('Argument', {
    description: DataTypes.STRING,
    form: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Argument.associate = function (models) {
    // associations can be defined here
    models.Argument.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    });

    models.Argument.hasMany(models.ArgumentPremise, {
      onDelete: "CASCADE",
      foreignKey: {
        name: 'argument_id',
        allowNull: false
      }
    });

    models.Argument.hasMany(models.Response, {
      onDelete: "CASCADE",
      foreignKey: {
        name: 'argument_id',
        allowNull: false
      }
    });
  };
  return Argument;
};