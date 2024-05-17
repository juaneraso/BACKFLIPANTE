const { User } = require("../../DataBase");

const getUserByName = async (req, res) => {
  try {
    const { name } = req.params; // Cambiar de 'id' a 'name' en los parámetros
    const userFound = await User.findOne({
      where: {
        name, // Cambiar de 'id' a 'name' en la condición de búsqueda
      },
    });
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json(userFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getUserByName;
