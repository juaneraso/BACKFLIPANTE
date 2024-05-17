const { User } = require("../../DataBase");
const { encrypt, compare } = require("./handlers/handleCrypt");

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(id);

    // Verificar si la contraseña actual proporcionada por el cliente coincide con la almacenada en la base de datos
    const passwordMatch = await compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: "La contraseña actual no es válida" });
    }

    // Hashear la nueva contraseña antes de almacenarla
    const hashedNewPassword = await encrypt(newPassword);

    // Actualizar la contraseña en la base de datos
    user.password = hashedNewPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = updatePassword;
