const { Review } = require("../../DataBase");

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const foundReview = await Review.update(
      { deleted: true },
      {
        where: {
          id,
        },
      }
    );
    if (!foundReview) {
      return res.status(404).json({ error: "No existe esta Review" });
    }

    return res.status(200).json({ message: "Review eliminada" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteReview;
