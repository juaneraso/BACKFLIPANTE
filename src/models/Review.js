const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      purchaseDate: {
        type: DataTypes.DATE, // Agrega un campo para la fecha y hora de la compra
        allowNull: false, // Asegúrate de que siempre haya una fecha y hora
        defaultValue: DataTypes.NOW, // Usa la fecha y hora actual como valor predeterminado
      },
    },
    { timestamps: false }
  );
};
