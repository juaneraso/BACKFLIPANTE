const { Visit } = require("../../DataBase");

const getVisit = async (req, res) => {
  try {
    const count = await Visit.findAll();

    return res.status(200).json(count);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getVisit;
