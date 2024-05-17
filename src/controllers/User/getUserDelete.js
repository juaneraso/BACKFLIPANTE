const { User } = require("../../DataBase");

const getUserDeleted = async (req, res) => {
  try {
    const userFound = await User.findAll({
      where: {
        deleted: true,
      },
    });
    if (!userFound) {
      return res
        .status(404)
        .json({ message: "Este usuario no esta eliminado" });
    }
    return res.status(200).json(userFound);
  } catch (error) {}
};

module.exports = getUserDeleted;
