const { Order, User, Product } = require("../../DataBase");

const getAllOrders = async (req, res) => {
  try {
    // Consulta todas las órdenes
    const orders = await Order.findAll();

    // Mapea las órdenes para agregar información adicional
    const ordersWithUserInfo = await Promise.all(
      orders.map(async (order) => {
        // Obtiene la información del usuario y el producto basándose en los IDs
        const user = await User.findByPk(order.userId, {
          attributes: ["name"], // Selecciona el nombre del usuario
        });

        const product = await Product.findByPk(order.productId, {
          attributes: ["name"], // Selecciona el nombre del producto
        });
        console.log(order);
        // Combina la información de la orden, usuario y producto
        return {
          id: order.id,
          userName: user ? user.name : null, // Nombre del usuario
          productName: product ? product.name : null, // Nombre del producto
          quantity: order.quantity,
          category: order.category,
          totalPrice: order.totalPrice,
          purchaseDate: order.purchaseDate,
          payment: order.payment,
        };
      })
    );

    return res.status(200).json(ordersWithUserInfo);
  } catch (error) {
    console.error("Error al obtener todas las órdenes:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = getAllOrders;
