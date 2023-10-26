const express = require('express');
const serverless = require("serverless-http");
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const router = express.Router();

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Test
router.get('/', (req, res) => {
  res.json({
    'hello': 'hola'
  })
})

router.get('/registro', (req, res) => {
  // Ruta al archivo JSON
  const filePath = path.join(__dirname, 'data', 'users.json');

  console.log(filePath)

  // Lee el archivo JSON de manera asíncrona
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Si hay un error al leer el archivo, envía una respuesta de error
      return res.status(500).json({ error: 'Error al leer el archivo JSON' });
    }

    // Parsea el contenido JSON a un objeto JavaScript
    try {
      const jsonData = JSON.parse(data);
      // Envía el JSON como respuesta
      res.json(jsonData);
    } catch (parseError) {
      // Si hay un error al analizar el JSON, envía una respuesta de error
      res.status(500).json({ error: 'Error al analizar el archivo JSON' });
    }
  });
});

// Ruta para el registro de usuarios
router.post('/registro', (req, res) => {
  const { correo, nombre, contraseña } = req.body;

  try {
    // Leer el archivo JSON existente
    const data = fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf8');
    const users = JSON.parse(data);

    // Verificar si el correo ya existe en la matriz de usuarios
    if (users.users.some(user => user.correo === correo)) {
      // El correo ya existe, envía un mensaje de error
      res.status(400).json({ message: 'El correo ya está registrado' });
    } else {
      // Agregar el nuevo usuario a la matriz de usuarios
      users.users.push({ correo, nombre, contraseña });

      // Guardar la matriz actualizada en el archivo JSON
      fs.writeFileSync(path.join(__dirname, 'data', 'users.json'), JSON.stringify(users, null, 2), 'utf8');

      res.status(200).json({ message: 'Usuario registrado con éxito' });
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});


app.use('/.netlify/functions/api', router);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

module.exports.handler = serverless(app);