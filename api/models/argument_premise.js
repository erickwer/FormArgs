'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArgumentPremise = sequelize.define('ArgumentPremise', {
    argument_id: DataTypes.INTEGER,
    type: DataTypes.STRING, 
    description: DataTypes.STRING,
    form: DataTypes.STRING,
    sentential_letters: DataTypes.STRING
  }, {
    tableName: 'Argument_premises'
  });
  ArgumentPremise.associate = function (models) {
    models.ArgumentPremise.belongsTo(models.Argument, {
      onDelete: "CASCADE",
      foreignKey: {
        name: 'argument_id',
        allowNull: false
      }
    });
  };
  return ArgumentPremise;
};