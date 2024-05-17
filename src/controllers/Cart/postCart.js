const { User, Product, Cart, Stock } = require("../../DataBase");

const postCart = async (req, res) => {
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

    // Buscar si ya existe un registro en Cart para este usuario, producto y tamaño
    const existingCartItem = await Cart.findOne({
      where: { userId, productId, sizeId },
    });

    // Verificar la cantidad disponible en Stock para el producto y tamaño seleccionados
    const stock = await Stock.findOne({
      where: { ProductId: productId, SizeId: sizeId },
    });

    if (!stock) {
      return res
        .status(404)
        .json({ message: "Tamaño de producto no encontrado en el stock." });
    }
    console.log(stock);

    if (existingCartItem) {
      // Si el registro existe, aumenta la cantidad en 1 si hay stock disponible
      if (existingCartItem.quantity < stock.quantity) {
        existingCartItem.quantity += 1;
        await existingCartItem.save();
        return res
          .status(200)
          .json({ message: "Producto agregado al carrito." });
      } else {
        return res
          .status(400)
          .json({ message: "No hay suficiente stock disponible." });
      }
    } else {
      // Si el registro no existe, crea uno nuevo si hay stock disponible
      if (stock.quantity > 0) {
        await Cart.create({ userId, productId, sizeId });
        return res
          .status(200)
          .json({ message: "Producto agregado al carrito." });
      } else {
        return res
          .status(400)
          .json({ message: "No hay suficiente stock disponible." });
      }
    }
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = postCart;
