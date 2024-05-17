const { Review, User, Product } = require("../../DataBase");
const arrayReviews = require("./arrayReviews");

const createReviews = async (req, res) => {
  try {
    // Obtén la lista de usuarios y productos desde la base de datos
    const users = await User.findAll();
    const products = await Product.findAll();

    // Mapea los usuarios y productos para obtener arrays de IDs
    const arrayIdUsers = users.map((user) => user.id);
    const arrayIdProducts = products.map((product) => product.id);

    // Itera a través de las revisiones y crea cada revisión
    for (const reviewData of arrayReviews) {
      // Comprueba si el usuario y el producto existen en la base de datos
      const userId = arrayIdUsers[reviewData.User - 1]; // Resta 1 porque los IDs en el array son 0 basados en índices
      const productId = arrayIdProducts[reviewData.Product - 1]; // Resta 1 de nuevo
      if (!userId || !productId) {
        return res
          .status(404)
          .json({ message: "Usuario o producto no encontrado." });
      }

      // Crea la revisión en la base de datos
      await Review.create({
        rating: reviewData.rating,
        comment: reviewData.comment,
        UserId: userId,
        ProductId: productId,
      });
    }

    return res.status(200).json({ message: "Reseñas creadas exitosamente." });
  } catch (error) {
    console.error("Error al crear reseñas:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = createReviews;
