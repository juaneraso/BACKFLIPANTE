const { User } = require("../../DataBase");
const { encrypt } = require("./handlers/handleCrypt");

const ModifyPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    const user = await User.findByPk(id);


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

module.exports = ModifyPassword;