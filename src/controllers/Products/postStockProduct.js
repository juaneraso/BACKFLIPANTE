const { Product, Size, Stock } = require("../../DataBase");

const postStockProduct = async (req, res) => {
  const { ProductId, SizeId, change } = req.params;
  try {
    // Buscar el registro de Stock correspondiente al productId y sizeId
    const stockRecord = await Stock.findOne({ where: { ProductId, SizeId } });
    console.log(ProductId, SizeId);
    if (!stockRecord) {
      return res
        .status(404)
        .json({ error: "No se encontró el registro de Stock" });
    }
    console.log(stockRecord.SizeId);
    // Verificar el valor de 'change' y ajustar la cantidad en consecuencia
    if (change === "true") {
      // Aumentar la cantidad en 1 si 'change' es true
      stockRecord.quantity += 1;
      console.log("Cuantiti", stockRecord.quantity);
      if (stockRecord.changed()) {
        await stockRecord.save();
      }
      return res
        .status(200)
        .json({ message: "Stock Aumentado", cantidad: stockRecord.quantity });
    } else if (change === "false") {
      // Disminuir la cantidad en 1 si 'change' es false, pero no permitir cantidades negativas
      if (stockRecord.quantity > 0) {
        stockRecord.quantity -= 1;
        if (stockRecord.changed()) {
          await stockRecord.save();
        }
        return res.status(200).json({
          message: "Stock  Disminuido",
          cantidad: stockRecord.quantity,
        });
      } else {
        return res.status(400).json({ error: "El stock ya es el mínimo (0)" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "El valor de 'change' debe ser 'true' o 'false'" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postStockProduct;
