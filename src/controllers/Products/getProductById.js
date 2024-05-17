const { Product, Size, Stock } = require("../../DataBase");

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const productFound = await Product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Size,
          through: Stock,
        },
      ],
    });
    if (!productFound) {
      return res.status(400).json({ error: "Producto no encontrado" });
    }
    return res.status(200).json(productFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getProductsById;
