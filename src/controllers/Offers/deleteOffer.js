const { Offer } = require("../../DataBase");

const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params; // Corrige de req.res a req.params para obtener el ID correctamente
    const offerFound = await Offer.findByPk(id);

    if (!offerFound) {
      return res
        .status(400)
        .json({ message: "No se encuentra descuento con este Id" });
    }

    // Establecer la propiedad 'active' como 'false'
    offerFound.actived = false;

    // Guardar los cambios en la base de datos
    await offerFound.save();

    // Responder con un mensaje de éxito
    return res.status(200).json({ message: "Descuento marcado como inactivo" });
  } catch (error) {
    // Manejar errores aquí
    console.error("Error al marcar el descuento como inactivo:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = deleteOffer;
