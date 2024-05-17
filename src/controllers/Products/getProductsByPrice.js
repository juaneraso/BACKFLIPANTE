const { Product } = require("../../DataBase");
const { Sequelize } = require("sequelize");

const getProductByPrice = async (req, res) => {
  try {

    const { desde, hasta } = req.params;


    console.log(`Desde: ${desde}, Hasta: ${hasta}`);

    const productsInRange = await Product.findAll({
      where: {
        price: {
          [Sequelize.Op.between]: [desde, hasta], // Buscar productos con precio en el rango [desde, hasta]
        },
      },
    });

    if (!productsInRange || productsInRange.length === 0) {
      return res.status(400).json({
        error:
          "No se encontraron productos en el rango de precios especificado",
      });
    }

    return res.status(200).json(productsInRange);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getProductByPrice;
