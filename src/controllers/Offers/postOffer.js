// descuentoController.js
const { Offer } = require("../../DataBase");

const postOffer = async (req, res) => {
  try {
    const newDescount = await Offer.create(req.body);
    res.status(201).json(newDescount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postOffer;
