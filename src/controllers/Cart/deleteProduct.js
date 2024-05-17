const { User, Product, Cart } = require("../../DataBase");

const deleteProduct = async (req, res) => {
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

    // Buscar el registro en Cart para este usuario, producto y tamaño
    const cartItem = await Cart.findOne({
      where: { userId, productId, sizeId },
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito." });
    }

    // Verificar la cantidad en el carrito
    if (cartItem.quantity > 1) {
      // Si la cantidad es mayor a 1, restar 1 a la cantidad
      cartItem.quantity -= 1;
      await cartItem.save();
    } else {
      // Si la cantidad es igual a 1, eliminar el registro del carrito
      await cartItem.destroy();
    }

    return res.status(200).json({
      message: "Producto eliminado o cantidad reducida en el carrito.",
    });
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = deleteProduct;
