const { Product, Size, Stock } = require("../../DataBase");
const products = require("./arrayProducts");

// Función para crear un producto y gestionar las tallas y el stock
const createProductWithSizesAndStock = async (
  productData,
  sizes,
  stock,
  productImages
) => {
  // Crea el producto en la tabla "Product"
  const createdProduct = await Product.create({
    ...productData,
    images: productImages,
  });

  // Obtiene el ID del producto recién creado
  const productId = createdProduct.id;

  // Itera sobre las tallas y el stock
  for (const sizeName in sizes) {
    if (sizes.hasOwnProperty(sizeName)) {
      const stockQuantity = sizes[sizeName];

      // Busca la talla en la tabla "Size" basándose en el nombre
      const size = await Size.findOne({ where: { name: sizeName } });

      // Si se encuentra la talla, obtiene su ID
      if (size) {
        const sizeId = size.id;

        // Verifica si ya existe una entrada en la tabla "Stock"
        const stockEntry = await Stock.findOne({
          where: { ProductId: productId, SizeId: sizeId },
        });

        // Si existe una entrada en "Stock", actualiza la cantidad de stock
        if (stockEntry) {
          const updatedQuantity = stockEntry.quantity + stockQuantity;
          await Stock.update(
            { quantity: updatedQuantity },
            { where: { id: stockEntry.id } }
          );
        } else {
          // Si no existe una entrada en "Stock", crea una nueva entrada
          await Stock.create({
            ProductId: productId,
            SizeId: sizeId,
            quantity: stockQuantity,
          });
        }
      }
    }
  }

  return createdProduct;
};

const postProduct = async (req, res) => {
  try {
    const count = await Product.count();

    console.log(count);

    if (count === 0) {
      // Solo si no hay productos en la base de datos, crea los productos del array 'products'
      for (const productData of products) {
        const {
          name,
          gender,
          category,
          mainMaterial,
          price,
          description,
          sizes,
          stock,
          images,
        } = productData;

        await createProductWithSizesAndStock(
          {
            name,
            gender,
            category,
            mainMaterial,
            price,
            description,
          },
          sizes,
          stock,
          images
        );
      }

      return res.status(200).json({ message: "Productos cargados con éxito" });
    } else {
      const {
        name,
        gender,
        category,
        mainMaterial,
        price,
        description,
        sizes,
        stock,
        images,
      } = req.body;

      await createProductWithSizesAndStock(
        {
          name,
          gender,
          category,
          mainMaterial,
          price,
          description,
        },
        sizes,
        stock,
        images
      );

      // Retorna una respuesta JSON de éxito
      return res
        .status(200)
        .json({ message: "Producto cargado exitosamente." });
    }
  } catch (error) {
    // En caso de error, retorna una respuesta JSON con el mensaje de error y un código de estado 500 (Error del servidor)
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postProduct;
