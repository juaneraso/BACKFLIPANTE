const { User } = require("../../DataBase");
const { compare } = require("./handlers/handleCrypt");

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    let user;

    if (regexEmail.test(name)) {
      const email = name;
      user = await User.findOne({ where: { email } });
    } else {
      user = await User.findOne({ where: { name } });
    }

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrados" });
    }

    if (user.deleted === true) {
      return res.status(403).json({ error: "Usuario Baneado" });
    }

    const checkPassword = await compare(password, user.password);
    if (checkPassword) {
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = loginUser;
