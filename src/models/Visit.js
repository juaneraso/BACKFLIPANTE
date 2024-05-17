const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Visit",
    {
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { timestamps: false }
  );
};
