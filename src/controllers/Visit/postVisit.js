// En visit.controller.js

const { Visit } = require("../../DataBase"); // Asegúrate de importar el modelo Visit

// Función para contar las visitas
async function countVisit(req, res) {
  try {
    // Intenta encontrar la visita actual
    let visit = await Visit.findOne();

    // Si no se encuentra ninguna visita, crea una nueva
    if (!visit) {
      visit = await Visit.create({ count: 1 }); // Puedes establecer el contador inicial como 1
    } else {
      // Incrementa el contador de visitas
      visit.count += 1;

      // Guarda el cambio en la base de datos
      await visit.save();
    }

    // Devuelve el contador de visitas actualizado
    res.json({ count: visit.count });
  } catch (error) {
    console.error("Error al contar la visita:", error);
    res.status(500).json({ error: "Error al contar la visita" });
  }
}

module.exports = countVisit

