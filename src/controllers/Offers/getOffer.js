const { Offer } = require("../../DataBase");

const getOffer = async (req, res) => {
  try {
    const offers = await Offer.findAll();
    return res.status(200).json(offers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getOffer;
