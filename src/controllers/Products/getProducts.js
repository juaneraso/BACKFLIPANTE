const { Product, Size, Stock } = require("../../DataBase");

const getProducts = async (req, res) => {
  try {
    // Obtén todos los productos de la tabla "Product" incluyendo las relaciones con "Size" y "Stock"
    const products = await Product.findAll({
      where: {
        deleted: false,
      },
      include: [
        {
          model: Size,
          through: Stock,
        },
      ],
      order: [["id", "ASC"]],
    });

    // Retorna la lista de productos en formato JSON
    return res.status(200).json(products);
  } catch (error) {
    // En caso de error, retorna una respuesta JSON con el mensaje de error y un código de estado 500 (Error del servidor)
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getProducts;
