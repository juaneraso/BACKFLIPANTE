const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const server = express();

// Rutas para el usuario:
const login = require("./routes/Users_Routes/login.routes"); // Ruta para iniciar sesión de usuario"
const register = require("./routes/Users_Routes/register.routes"); // Ruta para registrar un usuario
const deleteUser = require("./routes/Users_Routes/deleteUser.routes"); // Ruta para eliminar un usuario
const updataUser = require("./routes/Users_Routes/updateUser.routes"); // Ruta para actualizar información de usuario
const getUser = require("./routes/Users_Routes/getUsers.routes"); // Ruta para obtener información de usuario
const getUserByMail = require("./routes/Users_Routes/getUserByMail.routes");
const getUserByName = require("./routes/Users_Routes/getUserByName.routes");
const registerGoogle = require("./routes/Users_Routes/registerGoogle.routes");
const updatePassword = require("./routes/Users_Routes/changePassword.routes");
const getUserDeleted = require("./routes/Users_Routes/getUsersDeleteded");
const checkBannedStatus = require("./routes/Users_Routes/checkStatus.routes");
const ModifyPassword = require("./routes/Users_Routes/modifyPassword.routes");

// Rutas para las prendas:
const getProducts = require("./routes/Products_Routes/getProduct.routes"); // Ruta para obtener información de prendas
const postProducts = require("./routes/Products_Routes/postProduct.routes"); // Ruta para crear una nueva prenda
const deleteProducts = require("./routes/Products_Routes/deleteProduct.routes"); // Ruta para eliminar una prenda
const updateProducts = require("./routes/Products_Routes/updateProduct.routes"); // Ruta para actualizar información de prendas
const postSize = require("./routes/Products_Routes/Size/postSize.routes");
const getSize = require("./routes/Products_Routes/Size/getSize.routes");
const getProductByPrice = require("./routes/Products_Routes/getProductByPrice.routes");
const getProdcutsDeleted = require("./routes/Products_Routes/getProductsDeleted.routes");
const postStockProduct = require("./routes/Products_Routes/postStockProduct.routes");

// Rutas para Detalles y Filtros
const getGender = require("./routes/Products_Routes/getGender.routes");
const filter = require("./routes/Filters_Routes/filterProduct.routes");
const detail = require("./routes/Products_Routes/getProductById.routes");
const getCategory = require("./routes/Products_Routes/getCategory.routes");
const mercadoPago = require("./routes/MercadoPago_Routes/mercadoPago.routes");

// Ruta para favorites:
const postFavorite = require("./routes/Favorite_Routes/postFavorites.routes");
const getFavorites = require("./routes/Favorite_Routes/getFavorite.routes");
const deleteFav = require("./routes/Favorite_Routes/deleteFavorite.routes");

// Ruta para Cart :
const postCart = require("./routes/Cart_Routes/postCart.routes");
const getCart = require("./routes/Cart_Routes/getCart.routes");
const deleteProduct = require("./routes/Cart_Routes/deleteProduct.routes");
const deleteAllCart = require("./routes/Cart_Routes/deleteAllCart.routes");
const deleteAllProduct = require("./routes/Cart_Routes/deleteAllCart.routes");
const deleteAllProducts = require("./routes/Cart_Routes/deleteAllProducts.routes");

// Order
const addOrder = require("./routes/Order_Routes/addOrder.routes");
const getAllOrders = require("./routes/Order_Routes/getAllOrders.routes");
const getUserOrder = require("./routes/Order_Routes/getUserOrder.routes");
const deleteOrder = require("./routes/Order_Routes/deleteOrder.routes");
const paymentOrder = require("./routes/Order_Routes/paymentOrder.routes");
const getOrderById = require("./routes/Order_Routes/getOrderById.routes");
const deleteAllOrders = require("./routes/Order_Routes/deleteAllOrders.routes");

//Rutas para las reviews:
const postReview = require("./routes/Review_Routes/postReview.routes");
const getReviews = require("./routes/Review_Routes/getReview.routes");
const deleteReview = require("./routes/Review_Routes/deleteReview.routes");
const updateReview = require("./routes/Review_Routes/updateReview.routes");
const postMultipleReviews = require("./routes/Review_Routes/postMultipleReviews.routes");
const getReviewById = require("./routes/Review_Routes/getReviewById.routes");
const getReviewsByProductId = require("./routes/Review_Routes/getReviewByIdProduct.routes");

//Rutas para las ofertas:
const postOffer = require("./routes/Offer_Routes/postOffer.routes");
const getOffer = require("./routes/Offer_Routes/getOffer.routes");
const deleteOffer = require("./routes/Offer_Routes/deleteOffer.routes");
const updateOffer = require("./routes/Offer_Routes/updateOffer.routes");
// const payment = require("./routes/Cart_Routes/payment.routes");

//Rutas para las visitas:

const postVisit = require("./routes/Visit_Routes/postVisit.routes");
const getVisit = require("./routes/Visit_Routes/getVisit.routes");

// Middlewares
server.use(express.json()); // Parsea las solicitudes como JSON
server.use(cors()); // Habilita CORS para permitir solicitudes desde otros dominios
server.use(morgan("dev")); // Registro de solicitudes en la consola en formato 'dev'

// Rutas
server.use("/", login); // Ruta para iniciar sesión de usuario
server.use("/", register); // Ruta para registrar un usuario
server.use("/", deleteUser); // Ruta para eliminar un usuario
server.use("/", updataUser); // Ruta para actualizar información de usuario
server.use("/", getUser); // Ruta para obtener información de usuario
server.use("/", checkBannedStatus);
server.use("/", getUserDeleted);
server.use("/", getUserByName);
server.use("/", registerGoogle); // Ruta para registrar un usuario
server.use("/", getUserByMail);
server.use("/", getProdcutsDeleted);

server.use("/", getProducts); // Ruta para obtener información de prendas
server.use("/", postProducts); // Ruta para crear una nueva prenda
server.use("/", deleteProducts); // Ruta para eliminar una prenda
server.use("/", updateProducts); // Ruta para actualizar información de prendas
server.use("/", getProductByPrice);
server.use("/", postStockProduct);

server.use("/", mercadoPago); //Ruta para Mercado pago

//Rutas para las reviews:
server.use("/", postReview);
server.use("/", getReviews);
server.use("/", deleteReview);
server.use("/", updateReview);
server.use("/", postMultipleReviews);
server.use("/", getReviewById);
server.use("/", getReviewsByProductId);

// Rutas para el talle:
server.use("/", postSize);
server.use("/", getSize);
server.use("/", detail);

server.use("/", getGender);
server.use("/", getCategory);

// Ruta para los filtros
server.use("/", filter);

// Ruta para favorites:
server.use("/", postFavorite);
server.use("/", getFavorites);
server.use("/", deleteFav);

// Rutas Cart
server.use("/", postCart);
server.use("/", getCart);
server.use("/", deleteAllCart);
server.use("/", deleteAllProducts);
server.use("/", deleteProduct);
server.use("/", updatePassword);

// Order
server.use("/", addOrder);
server.use("/", deleteOrder);
server.use("/", getAllOrders);
server.use("/", getUserOrder);
server.use("/", paymentOrder);
server.use("/", getOrderById);
server.use("/", deleteAllOrders);

//Rutas Visit:
server.use("/", postVisit);
server.use("/", getVisit);

//Rutas para ofertas
server.use("/", postOffer);
server.use("/", getOffer);
server.use("/", deleteOffer);
server.use("/", updateOffer);

server.use("/", updatePassword);
server.use("/", updatePassword);
server.use("/", ModifyPassword);

module.exports = server; // Exportar el servidor configurado
