// const { Order } = require("../../DataBase");

// const getUserOrders = async (req, res) => {
//   try {
//     const userId = parseInt(req.params.userId, 10);
//     // Consulta todas las órdenes donde el ID de usuario coincide
//     const userOrders = await Order.findAll({
//       where: {
//         userId: userId,
//       },
//     });

//     return res.status(200).json(userOrders);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// module.exports = getUserOrders;

const { Order, User, Product } = require("../../DataBase");

const getUserOrders = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    // Consulta todas las órdenes donde el ID de usuario coincide
    const userOrders = await Order.findAll({
      where: {
        userId: userId,
      },
    });

    // Mapea los resultados para obtener información del producto y el usuario
    const ordersWithUserInfo = await Promise.all(
      userOrders.map(async (order) => {
        // Obtiene la información del usuario basándose en el ID
        const user = await User.findByPk(order.userId, {
          attributes: ["name"], // Selecciona el nombre del usuario
        });

        // Obtiene la información del producto basándose en el ID
        const product = await Product.findByPk(order.productId, {
          attributes: ["name", "images", "id"], // Selecciona el nombre del producto
        });

        return {
          id: order.id,
          productId: product.id,
          image: product.images,
          userName: user ? user.name : null, // Nombre del usuario
          productName: product ? product.name : null, // Nombre del producto
          quantity: order.quantity,
          totalPrice: order.totalPrice,
          purchaseDate: order.purchaseDate,
          payment: order.payment,
        };
      })
    );

    return res.status(200).json(ordersWithUserInfo);
  } catch (error) {
    console.error("Error al obtener las órdenes del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = getUserOrders;
