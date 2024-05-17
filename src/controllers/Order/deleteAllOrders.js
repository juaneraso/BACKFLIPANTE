const { Order } = require("../../DataBase");

const deleteAllOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Faltan datos del usuario." });
    }

    // Busca todas las órdenes del usuario con payment en false
    const ordersToDelete = await Order.findAll({
      where: {
        userId,
        payment: false,
      },
    });

    if (!ordersToDelete || ordersToDelete.length === 0) {
      return res.status(200).json({
        message: "No se encontraron órdenes para eliminar.",
      });
    }

    // Elimina todas las órdenes encontradas
    for (const order of ordersToDelete) {
      await order.destroy();
    }

    return res.status(200).json({ message: "Órdenes eliminadas con éxito." });
  } catch (error) {
    console.error("Error al eliminar las órdenes:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = deleteAllOrder;
