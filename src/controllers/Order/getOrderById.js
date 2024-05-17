const { Order, User, Product } = require("../../DataBase");

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderFound = await Order.findByPk(id);
    console.log(orderFound);
    if (!orderFound) {
      return res.status(404).json({ error: "No hay orden con ese Id" });
    }

    // Obtiene la información del usuario y el producto basándose en los IDs
    const user = await User.findByPk(orderFound.userId, {
      attributes: ["name"], // Selecciona el nombre del usuario
    });

    const product = await Product.findByPk(orderFound.productId, {
      attributes: ["name", "images", "id"], // Selecciona el nombre del producto
    });

    // Combina la información de la orden, usuario y producto
    const orderWithUserInfo = {
      id: orderFound.id,
      productId: product.id,
      image: product.images,
      userName: user ? user.name : null, // Nombre del usuario
      productName: product ? product.name : null, // Nombre del producto
      quantity: orderFound.quantity,
      totalPrice: orderFound.totalPrice,
      purchaseDate: orderFound.purchaseDate,
      payment: orderFound.payment,
    };

    return res.status(200).json(orderWithUserInfo);
  } catch (error) {
    console.error("Error al obtener la orden por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = getOrderById;
