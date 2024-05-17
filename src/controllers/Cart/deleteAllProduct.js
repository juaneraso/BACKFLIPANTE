const { User, Product, Cart } = require("../../DataBase");

const deleteAllProduct = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const productId = parseInt(req.params.productId, 10);
    const sizeId = parseInt(req.params.sizeId, 10);

    if (!userId || !productId || !sizeId) {
      return res
        .status(400)
        .json({ message: "Falta el ID de usuario, producto o tamaño." });
    }

    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    // Buscar y eliminar todos los registros en Cart para este usuario, producto y tamaño
    await Cart.destroy({
      where: { userId, productId, sizeId },
    });

    return res.status(200).json({
      message:
        "Todos los productos eliminados del carrito para este usuario, producto y tamaño.",
    });
  } catch (error) {
    console.error("Error al eliminar productos del carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = deleteAllProduct;
