const { Review, User, Product } = require("../../DataBase");

const postReview = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { rating, comment } = req.body;
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "Falta el ID de usuario o producto." });
    }

    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);
    if (!user || !product) {
      return res
        .status(404)
        .json({ message: "Usuario o producto no encontrado." });
    }

    const review = await Review.create({ rating, comment });
    await review.setUser(user);
    await review.setProduct(product);

    return res.status(200).json({ message: "Review creada con éxito." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postReview;
