const { Product, Size, Stock } = require("../../DataBase");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      deleted,
      gender,
      category,
      mainMaterial,
      images,
      price,
      description,
      Sizes,
    } = req.body;

    const existingProduct = await Product.findByPk(id, {
      include: Size, // Incluir tallas en la búsqueda
    });
    console.log("existingProduct", existingProduct);
    if (!existingProduct) {
      console.log("Producto no encontrado.");
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    // Actualizar los campos del producto
    if (name !== undefined && name !== "") {
      console.log("Nombre actualizado:", name);
      existingProduct.name = name;
    }

    if (deleted !== undefined && deleted !== "") {
      console.log("Estado actualizado:", deleted);
      existingProduct.deleted = deleted;
    }

    if (gender !== undefined && gender !== "") {
      console.log("Género actualizado:", gender);
      existingProduct.gender = gender;
    }

    if (category !== undefined && category !== "") {
      console.log("Categoría actualizada:", category);
      existingProduct.category = category;
    }

    if (mainMaterial !== undefined && mainMaterial !== "") {
      console.log("Material principal actualizado:", mainMaterial);
      existingProduct.mainMaterial = mainMaterial;
    }

    if (images !== undefined && images.length > 0) {
      console.log("Imágenes actualizadas:", images);
      existingProduct.images = images;
    }

    if (price !== undefined && price !== "") {
      console.log("Precio actualizado:", price);
      existingProduct.price = price;
    }

    if (description !== undefined && description !== "") {
      console.log("Descripción actualizada:", description);
      existingProduct.description = description;
    }

    // Actualizar la cantidad de stock para el producto
    if (Sizes !== undefined && Sizes.length > 0) {
      // Eliminar todas las entradas de stock existentes para este producto
      await Stock.destroy({ where: { ProductId: existingProduct.id } });

      // Crear las nuevas entradas de stock
      for (const newSize of Sizes) {
        console.log("Talla recibida:", newSize.name);
        const size = await Size.findOne({ where: { name: newSize.name } });
        if (size) {
          console.log("Talla encontrada en la base de datos:", size.name);
          console.log(
            "Cantidad de stock a actualizar:",
            newSize.Stock.quantity
          );
          await Stock.create({
            ProductId: existingProduct.id,
            SizeId: size.id,
            quantity: newSize.Stock.quantity,
          });
        }
      }
    }

    // Siempre guardar el producto sin comprobar cambios
    await existingProduct.save();
    console.log("Producto actualizado con éxito.");
    return res.status(200).json({ message: "Producto actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = updateProduct;
