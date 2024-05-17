const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Offer",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Asegura que cada código de descuento sea único
      },
      percentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      actived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
