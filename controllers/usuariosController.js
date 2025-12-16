const usuariosService = require('../services/usuariosService'); 
// Importa las funciones de manejo de usuarios (leer, crear, actualizar, eliminar)

const jwt = require('jsonwebtoken'); 
// Importa la librería para crear y verificar JWT

// Clave secreta para firmar el JWT
const SECRET_KEY = 'TU_SECRETO'; // En producción usar process.env.SECRET_KEY
// Esta clave se usa para "firmar" el token. La librería genera la firma combinando esta clave con el payload y el algoritmo (HS256 por defecto)

// -------------------- CRUD DE USUARIOS --------------------

// Obtener todos los usuarios
exports.obtenerTodos = (req, res) => {
  const usuarios = usuariosService.listar(); // Trae todos los usuarios del archivo JSON
  res.json(usuarios); // Devuelve los usuarios en formato JSON
};

// Obtener usuario por ID
exports.obtenerPorId = (req, res) => {
  const usuario = usuariosService.buscarPorId(parseInt(req.params.id)); 
  // Busca un usuario por su ID recibido en la URL
  usuario ? res.json(usuario) : res.status(404).json({ mensaje: 'Usuario no encontrado' }); 
  // Si existe lo devuelve, si no devuelve error 404
};

// Crear un usuario
exports.crear = (req, res) => {
  const nuevo = usuariosService.crear(req.body); 
  // Crea un nuevo usuario con los datos enviados en el body
  res.status(201).json(nuevo); 
  // Devuelve el usuario creado con código HTTP 201
};

// Actualizar usuario
exports.actualizar = (req, res) => {
  const actualizado = usuariosService.actualizar(parseInt(req.params.id), req.body); 
  // Actualiza el usuario con los cambios enviados en el body
  actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'Usuario no encontrado' }); 
  // Devuelve el usuario actualizado o 404 si no existe
};

// Eliminar usuario
exports.eliminar = (req, res) => {
  const eliminado = usuariosService.eliminar(parseInt(req.params.id)); 
  // Elimina el usuario según ID
  eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'Usuario no encontrado' }); 
  // Devuelve el usuario eliminado o 404 si no existe
};

// ---------------------- LOGIN CON JWT ----------------------
exports.login = (req, res) => {
  const { nombre, password } = req.body; 
  // Recibe nombre y contraseña del body del POST

  const usuarios = usuariosService.listar(); 
  // Trae todos los usuarios para verificar credenciales
  const usuario = usuarios.find(u => u.nombre === nombre && u.password === password); 
  // Busca un usuario que coincida con nombre y password

  if (!usuario) {
    return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' }); 
    // Si no existe, devuelve error 401 (no autorizado)
  }

  // Crear el token JWT
  const token = jwt.sign(
    { id: usuario.id, nombre: usuario.nombre }, // Payload: información que queremos guardar en el token
    SECRET_KEY, // Clave secreta para firmar el token
    { expiresIn: '1h' } // El token expirará en 1 hora
  );
  // Nota: jsonwebtoken genera automáticamente la firma (parte final del JWT) combinando la clave secreta y el payload.

  res.json({ token }); 
  // Devuelve el token al frontend
};
