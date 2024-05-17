const { Product } = require("../../DataBase");
//const products = require("./arrayProducts");

const getGender = async (_req, res) => {
  try {
    // Especifica las columnas que deseas seleccionar, en este caso, solo la columna 'name'
    const genders = await Product.findAll({
      attributes: ["gender"], // Especifica las columnas que deseas seleccionar
    });

    if (genders.length > 0) {
      // El resultado será un array de objetos con la propiedad 'gender'
      const genderNames = genders.map((gender) => gender.gender);
      const genderSet = new Set(genderNames);
      const arrayGenders = [...genderSet]; // Corrección aquí
      return res.status(200).json(arrayGenders);
    }

    return res.status(200).json({ message: "No hay generados agregados" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getGender;
