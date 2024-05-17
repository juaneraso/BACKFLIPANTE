require("dotenv").config();
const server = require("./src/app");
const { PORT } = process.env || 3001;
const { connect } = require("./src/DataBase");

connect.sync({ force: false}).then(() => {
  console.log("Conexión con la base de datos exitosa");
  server.listen(PORT, () => {
    console.log(`Servidor iniciado con exito en el puerto: ${PORT}`);
  });
});
