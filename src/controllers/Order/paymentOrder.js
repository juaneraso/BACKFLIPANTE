const { Order } = require("../../DataBase");

const paymentOrder = async (req, res) => {
  try {
    const { userId, productId, sizeId, quantity, totalPrice, category } =
      req.body;

    // Busca la orden que coincida con los datos proporcionados
    const order = await Order.findOne({
      where: {
        userId,
        productId,
        sizeId,
        quantity,
        totalPrice,
        category,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada." });
    }

    // Actualiza el campo payment a true
    await order.update({ payment: true });

    return res.status(200).json({ message: "Orden actualizada con éxito." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = paymentOrder;
