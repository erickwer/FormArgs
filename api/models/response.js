'use strict';
module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    exe_hash: DataTypes.STRING,
    time_spent: DataTypes.STRING,
    token: DataTypes.STRING,
    argument_id: DataTypes.INTEGER
  }, {});
  Response.associate = function (models) {
    // associations can be defined here
    models.Response.belongsTo(models.Argument, {
      onDelete: "CASCADE",
      foreignKey: {
        name: 'argument_id',
        allowNull: false
      }
    });
  };
  return Response;
};