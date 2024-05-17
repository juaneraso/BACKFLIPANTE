const { User, Cart } = require("../../DataBase");

const deleteAllCart = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (!userId) {
      return res.status(400).json({ message: "Falta el ID de usuario." });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Eliminar todos los registros del carrito para este usuario
    await Cart.destroy({
      where: { userId },
    });

    return res.status(200).json({
      message: "Todos los productos del carrito han sido eliminados.",
    });
  } catch (error) {
    console.error("Error al eliminar todos los productos del carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = deleteAllCart;
