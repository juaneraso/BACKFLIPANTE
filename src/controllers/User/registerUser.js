const { User } = require("../../DataBase");
const arrayUsers = require("./arrayUsers");
const { encrypt } = require("./handlers/handleCrypt");
const { validateEmail, validatePassword } = require("./validators"); // Asegúrate de tener un módulo para validar el email y la contraseña

const registerUser = async (req, res) => {
  try {
    const userCount = await User.count();
    if (userCount === 0 && arrayUsers.length > 0) {
      const bulkCreateData = arrayUsers.map(async (user) => {
        // Hashea la contraseña utilizando tu handler de encriptación
        const hashedPassword = await encrypt(user.password);

        return {
          name: user.name,
          email: user.email,
          password: hashedPassword,
        };
      });

      // Utiliza Promise.all para ejecutar todas las operaciones de hashing en paralelo
      const usersToCreate = await Promise.all(bulkCreateData);

      await User.bulkCreate(usersToCreate, { ignoreDuplicates: true });
      return res
        .status(200)
        .json({ message: "Usuarios ficticios cargados con éxito" });
    }

    // Verificar si la base de datos de usuarios está vacía
    else {
      const { name, email, password, isSuperuser } = req.body;

      // Validar el nombre
      if (!name || name.length < 6 || name.length > 25) {
        return res
          .status(400)
          .json({ message: "El nombre debe tener entre 6 y 25 caracteres" });
      }

      // Validar el email
      if (!validateEmail(email)) {
        return res
          .status(400)
          .json({ message: "El correo electrónico no es válido" });
      }

      // Validar la contraseña
      const validateP = validatePassword(password);
      if (validateP.error) {
        return res.status(400).json(validateP);
      } else {
        if (!validatePassword(password)) {
          return res.status(400).json({
            message: "La contraseña debe contener letras y números",
          });
        }
      }

      const existingUserByName = await User.findOne({ where: { name } });
      const existingUserByEmail = await User.findOne({ where: { email } });

      if (existingUserByName) {
        return res
          .status(400)
          .json({ message: "El nombre de usuario ya existe" });
      }

      if (existingUserByEmail) {
        return res
          .status(400)
          .json({ message: "El correo electrónico ya existe" });
      }

      // Hashea la contraseña utilizando tu handler de encriptación
      const hashedPassword = await encrypt(password);

      // Crear un objeto con las propiedades para el nuevo usuario
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };

      // Si se proporciona la propiedad isSuperuser en el cuerpo de la solicitud, asignarla al nuevo usuario
      if (isSuperuser !== undefined) {
        newUser.isSuperuser = isSuperuser;
      }

      await User.create(newUser);

      return res.status(200).json({ message: "Usuario creado con éxito!!!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = registerUser;
