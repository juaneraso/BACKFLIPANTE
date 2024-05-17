const { Product } = require("../../DataBase");

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await Product.findByPk(id);

    if (deleteProduct) {
      deleteProduct.deleted = true;
    }

    if (deleteProduct.changed()) {
      await deleteProduct.save();
      return res.status(200).json({ message: "Prenda eliminada." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProduct;
