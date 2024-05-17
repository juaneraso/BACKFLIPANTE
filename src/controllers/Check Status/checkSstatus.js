const { User } = require("../../DataBase");

const checkStatus = async (req, res) => {
  const { email } = req.body;

  try {
    // Busca al usuario por su correo electrónico
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verifica la propiedad 'deleted'
    if (user.deleted) {
      return res.status(200).json({ banned: true });
    } else {
      return res.status(202).json({ banned: false });
    }
  } catch (error) {
    console.error("Error al verificar el estado de baneo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = checkStatus;
