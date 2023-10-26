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

router.get('/registro', async (req, res) => {
  try {
    const filePath = path.join('client', 'public', 'data', 'users.json');

    //const filePath = path.join('..\\..\\..\\..', 'client', 'public', 'data', 'users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);

    console.log(users)
    res.json(users);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener el archivo JSON' });
  }
  try {
    const filePath = path.join('data', 'users.json');

    //const filePath = path.join('..\\..\\..\\..', 'client', 'public', 'data', 'users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);

    console.log(users)
    res.json(users);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener el archivo JSON' });
  }
  try {
    const filePath = path.join('..\\..\\..\\..', 'client', 'public', 'data', 'users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);

    console.log(users)
    res.json(users);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener el archivo JSON' });
  }
  try {
    const filePath = path.join('..\\..\\..\\..\\..', 'client', 'public', 'data', 'users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);

    console.log(users)
    res.json(users);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener el archivo JSON' });
  }
  try {
    const filePath = path.join(__dirname, 'data', 'users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);

    console.log(users)
    res.json(users);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener el archivo JSON' });
  }
  try {
    const filePath = path.join(__dirname, 'client', 'public', 'data', 'users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);

    console.log(users)
    res.json(users);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener el archivo JSON' });
  }
});

// Ruta POST para registrar usuarios
router.post('/registro', (req, res) => {
  const { correo, nombre, contraseña } = req.body;

  try {
    // Leer el archivo JSON existente
    const filePath = path.join(__dirname, '..', 'client', 'public', 'data', 'users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);

    // Verificar si el correo ya existe en la matriz de usuarios
    if (users.users.some(user => user.correo === correo)) {
      // El correo ya existe, envía un mensaje de error
      res.status(400).json({ message: 'El correo ya está registrado' });
    } else {
      // Agregar el nuevo usuario a la matriz de usuarios
      users.users.push({ correo, nombre, contraseña });

      // Guardar la matriz actualizada en el archivo JSON
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');

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