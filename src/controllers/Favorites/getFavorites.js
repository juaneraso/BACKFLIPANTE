const { User, Product } = require("../../DataBase");

const getFavorites = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (!userId) {
      return res.status(400).json({ message: "Falta el ID de usuario." });
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

    // La lista de productos favoritos ahora ya está filtrada por deleteFav en false
    const favorites = user.Products;
    console.log(favorites);

    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getFavorites;
