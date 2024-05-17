const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      mainMaterial: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },

      images: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
