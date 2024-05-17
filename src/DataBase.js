require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_NAME, DB_PASSWORD, DB_HOST, DB_USER,DATABASE_URL } = process.env;
const ProductModel = require("./models/Product");
const SizeModel = require("./models/Size");
const UserModel = require("./models/User");
const FavoriteModel = require("./models/Favorite");
const CartModel = require("./models/Cart");
const StockModel = require("./models/Stock");
const OrderModel = require("./models/Order");
const ReviewModel = require("./models/Review");
const VistiModel = require("./models/Visit");
const OfferModel = require("./models/Offer");

const sequelize = new Sequelize(

  `${DATABASE_URL}`,

  // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,

  {
    logging: false,
  }
);

// Inicializar modeloss
ProductModel(sequelize);
SizeModel(sequelize);
UserModel(sequelize);
FavoriteModel(sequelize);
CartModel(sequelize);
StockModel(sequelize);
OrderModel(sequelize);
ReviewModel(sequelize);
VistiModel(sequelize);
OfferModel(sequelize);

const { Product, Size, User, Cart, Stock, Review } = sequelize.models;

// Configurar relaciones
Product.belongsToMany(Size, { through: Stock });
Size.belongsToMany(Product, { through: Stock });

User.belongsToMany(Product, { through: "FavoriteItem" });
Product.belongsToMany(User, { through: "FavoriteItem" });

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = {
  ...sequelize.models,
  connect: sequelize,
};
