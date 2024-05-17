const { Review } = require("../../DataBase");

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, deleted } = req.body;
    const reviewFound = await Review.findByPk(id);
    if (!reviewFound) {
      return res.status(404).json({ error: "No existe una review con ese ID" });
    }

    if (rating !== undefined && rating !== "") {
      reviewFound.rating = rating;
    }
    if (comment !== undefined && comment !== "") {
      reviewFound.comment = comment;
    }
    if (deleted !== undefined && deleted !== "") {
      reviewFound.deleted = deleted;
    }

    if (reviewFound.changed()) {
      await reviewFound.save();
      return res.status(200).json({ message: "Review actualizada" });
    }
    return res.status(200).json({ message: "No hubo cambios" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = updateReview;
