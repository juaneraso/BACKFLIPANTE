const { Size } = require("../../../DataBase");
const sizesData = require("./arraySize");

const postSizes = async (req, res) => {
  try {
    // Verificar si la tabla de Size está vacía
    const sizeCount = await Size.count();

    if (sizeCount === 0) {
      // Si la tabla de Size está vacía, cargar todas las tallas desde el arreglo
      await Size.bulkCreate(sizesData);
      return res.status(200).json({ message: "Talles agregadas con exito" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al cargar las tallas en la base de datos." });
  }
};

module.exports = postSizes;
