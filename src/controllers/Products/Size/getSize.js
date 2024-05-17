const { Size } = require("../../../DataBase");

const getSize = async (_req, res) => {
  try {
    // Especifica las columnas que deseas seleccionar, en este caso, solo la columna 'name'
    const sizes = await Size.findAll({
      attributes: ["name"], // Especifica las columnas que deseas seleccionar
    });

    if (sizes.length > 0) {
      // El resultado será un array de objetos con la propiedad 'name'
      const sizeNames = sizes.map((size) => size.name);
      return res.status(200).json(sizeNames);
    }

    return res.status(200).json({ message: "No hay talles agregados" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getSize;
