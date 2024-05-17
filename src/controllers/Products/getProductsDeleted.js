const { Product, Size, Stock } = require("../../DataBase");

const getProdcutsDeleted = async (req, res) => {
  try {
    const foundProducts = await Product.findAll({
      where: {
        deleted: true,
      },
      include: [
        {
          model: Size,
          through: Stock,
        },
      ],
    });
    if (!foundProducts) {
      return res
        .status(400)
        .json({ message: "Este producto no esta eliminado" });
    }

    return res.status(200).json(foundProducts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getProdcutsDeleted;
