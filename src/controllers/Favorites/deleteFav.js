const { User, Product } = require("../../DataBase");

const deleteFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "Falta el ID de usuario o ID de producto." });
    }

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Product,
          through: {
            where: {
              deleteFav: false, // Filtrar por deleteFav en false
            },
          },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Buscar el producto favorito por ID y verificar si no ha sido eliminado previamente
    const favoriteProduct = user.Products.find(
      (product) => product.id === parseInt(productId, 10)
    );

    if (!favoriteProduct) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en favoritos." });
    }

    if (!favoriteProduct.deleteFav) {
      // Si el producto no ha sido eliminado previamente, establece deleteFav en true
      await favoriteProduct.FavoriteItem.update({ deleteFav: true });
      return res
        .status(200)
        .json({ message: "Producto eliminado de favoritos." });
    } else {
      return res
        .status(403)
        .json({ message: "El producto ya fue eliminado de favoritos." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteFavorite;
