const { Product, Size } = require("../../DataBase");

const filter = async (req, res) => {
  try {
    const { name, size, price, gender, category } = req.body;
    const products = await Product.findAll({
      where: {
        deleted: false,
      },
      include: [
        {
          model: Size,
          as: "Sizes",
          attributes: ["name"],
        },
      ],
    });

    let filteredProducts = [...products];

    // Filtro por name
    if (name) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Filtro por size
    if (size) {
      filteredProducts = filteredProducts.filter((product) => {
        const sizes = product.Sizes.map((sizeObj) =>
          sizeObj.name.toLowerCase()
        );
        return sizes.includes(size.toLowerCase());
      });
    }

    // Filtro por price
    if (price) {
      const numericPrice = parseFloat(price);
      filteredProducts = filteredProducts.filter(
        (product) => parseFloat(product.price) === numericPrice
      );
    }

    // Filtro por gender
    if (gender) {
      filteredProducts = filteredProducts.filter((product) =>
        product.gender.toLowerCase().includes(gender.toLowerCase())
      );
    }

    // Filtro por category
    if (category) {
      if (category.toLowerCase() === "todos") {
        filteredProducts = products;
      }
      filteredProducts = filteredProducts.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Verifico que tenga algo adentro
    if (filteredProducts.length > 0) {
      const productsWithSizeNames = filteredProducts.map((product) => ({
        id: product.id,
        name: product.name,
        gender: product.gender,
        category: product.category,
        mainMaterial: product.mainMaterial,
        description: product.description,
        images: product.images,
        price: product.price,
        stock: product.stock,
        delete: product.delete,
        sizes: product.Sizes.map((size) => size.name), // Mapea los nombres de los tamaños
      }));
      return res.status(200).json(productsWithSizeNames);
    } else {
      return res.status(404).json({
        message:
          "De momento no se encuentra disponible un producto con dichas características.",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = filter;
