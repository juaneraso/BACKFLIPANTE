const { Review, User, Product } = require("../../DataBase");

const getReviews = async (req, res) => {
  try {
    const allReviews = await Review.findAll({
      where: {
        deleted: false,
      },
      include: [
        {
          model: User,
          attributes: ["name"], // Solo selecciona el atributo "name" del usuario
        },
        {
          model: Product,
          attributes: ["name"], // Solo selecciona el atributo "name" del producto
        },
      ],
    });

    if (allReviews.length > 0) {
      return res.status(200).json(
        allReviews.map((review) => {
          return {
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            deleted: review.deleted,
            User: review.User.name,
            Product: review.Product.name,
            PurchaseDate:review.purchaseDate,
          };
        })
      );
    }

    return res.status(404).json({ error: "No se encontraron reviews" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getReviews;
