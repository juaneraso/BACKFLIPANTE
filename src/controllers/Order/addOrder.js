const { Order } = require("../../DataBase");

const addOrder = async (req, res) => {
  try {
    const { userId, productId, sizeId, quantity, totalPrice, category } =
      req.body;
    if (!userId) {
      return res.status(400).json({ message: "Falta el ID de usuario." });
    }

    if (!productId) {
      return res.status(400).json({ message: "Falta el ID de Producto." });
    }

    if (!quantity) {
      return res.status(400).json({ message: "Falta Cantidad." });
    }
    const purchaseDate = new Date();
    await Order.create({
      userId,
      productId,
      category,
      sizeId,
      quantity,
      totalPrice,
      purchaseDate,
      payment: false, // Establece el valor de payment en false
    });
    return res.status(201).json({ message: "Orden creada con éxito." });
  } catch (error) {
    console.error("Error en el controlador de addOrder:", error);
    return res.status(500).json("pepe");
  }
};

module.exports = addOrder;
