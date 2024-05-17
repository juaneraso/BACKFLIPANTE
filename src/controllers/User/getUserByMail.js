const { User } = require("../../DataBase");

const getUserByMail = async (req, res) => {
  try {
    const { email } = req.params;
    const userFound = await User.findOne({
      where: {
        email,
      },
    });
    if (!userFound) {
      return res.status(404).json({ message: "No hay usuarios con ese mail" });
    }

    return res.status(200).json(userFound);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getUserByMail;
