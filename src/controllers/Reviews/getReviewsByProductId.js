const { Review, User } = require("../../DataBase");

const getReviewsByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const myReviews = await Review.findAll({
      where: { ProductId: id, deleted: false },
      include: [
        {
          model: User,
          attributes: ["name"], // Solo selecciona el atributo "name" del producto
        },
      ],
    });

    if (myReviews.length > 0) {
      return res.status(200).json(
        myReviews.map((review) => {
          return {
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            user: review.User.name,
          };
        })
      );
    }

    return res
      .status(404)
      .json({ error: "No se encontraron revisiones para este usuario" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getReviewsByProductId;
