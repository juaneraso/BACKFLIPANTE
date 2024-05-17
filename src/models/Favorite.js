const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "FavoriteItem",
    {
      deleteFav: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
