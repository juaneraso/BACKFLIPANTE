const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Asegúrate de que siempre haya un usuario asociado
      },
      productId: {
        type: DataTypes.INTEGER, // O el tipo de dato adecuado para almacenar la lista de productos
        allowNull: false,
        defaultValue: 0,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sizeId: {
        type: DataTypes.INTEGER, // O el tipo de dato adecuado para almacenar la lista de productos
        allowNull: false,
        defaultValue: 0,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Comienza con una cantidad de 1
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Comienza con una cantidad de 1
      },
      purchaseDate: {
        type: DataTypes.DATE, // Agrega un campo para la fecha y hora de la compra
        allowNull: false, // Asegúrate de que siempre haya una fecha y hora
        defaultValue: DataTypes.NOW, // Usa la fecha y hora actual como valor predeterminado
      },
      payment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Por defecto, la compra no está confirmada
      },
    },
    { timestamps: false }
  );
};
