const { Product, Size, Stock } = require("../../DataBase");

//const products = require("./arrayProducts");

const getCategory = async (_req, res) => {
  try {
    // Especifica las columnas que deseas seleccionar, en este caso, solo la columna 'name'
    const categories = await Product.findAll({
      attributes: ["category"],
      include: [
        {
          model: Size,
          through: Stock,
        },
      ], // Especifica las columnas que deseas seleccionar
    });

    if (categories.length > 0) {
      // El resultado será un array de objetos con la propiedad 'gender'
      const categoriesNames = categories.map((category) => category.category);
      const categorySet = new Set(categoriesNames);
      const arrayCategories = [...categorySet]; // Corrección aquí
      return res.status(200).json(arrayCategories);
    }

    return res.status(200).json({ message: "No hay categorias agregados" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getCategory;
