const { Order } = require("../../DataBase");

const deleteOrder = async (req, res) => {
  try {
    const { userId, productId, sizeId, quantity, totalPrice } = req.body;

    if (!userId || !productId || !sizeId || !quantity || !totalPrice) {
      return res
        .status(400)
        .json({ message: "Faltan datos necesarios para eliminar la orden." });
    }

    // Busca la orden que coincida con los datos proporcionados :)
    const orderToDelete = await Order.findOne({
      where: {
        userId,
        productId,
        sizeId,
        quantity,
        totalPrice,
      },
    });

    if (!orderToDelete) {
      return res.status(404).json({
        message:
          "No se encontró la orden que coincida con los datos proporcionados.",
      });
    }

    // Elimina la orden encontrada
    await orderToDelete.destroy();

    return res.status(200).json({ message: "Orden eliminada con éxito." });
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = deleteOrder;
