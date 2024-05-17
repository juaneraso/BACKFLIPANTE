const { Visit } = require("../../DataBase");

const getVisit = async (req, res) => {
  try {
    // Obtén el registro de visitas (supongo que solo tienes un registro)
    const visit = await Visit.findOne();

    // Incrementa el contador
    visit.count += 1;

    // Guarda los cambios en la base de datos
    await visit.save();

    // Devuelve el nuevo valor del contador
    res.json({ count: visit.count });
  } catch (error) {
    console.error("Error al incrementar el contador de visitas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getVisit;
