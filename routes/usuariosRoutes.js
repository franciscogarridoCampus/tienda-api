const express = require('express'); 
// Importa Express para definir rutas

const router = express.Router(); 
// Crea un router para agrupar las rutas de usuarios

const usuariosController = require('../controllers/usuariosController'); 
// Importa el controller de usuarios donde están las funciones CRUD y login

// Definir las rutas para los usuarios
router.get('/', usuariosController.obtenerTodos); 
// GET /usuarios -> devuelve todos los usuarios

router.get('/:id', usuariosController.obtenerPorId); 
// GET /usuarios/:id -> devuelve un usuario según su ID

router.post('/', usuariosController.crear); 
// POST /usuarios -> crea un nuevo usuario

router.put('/:id', usuariosController.actualizar); 
// PUT /usuarios/:id -> actualiza un usuario según su ID

router.delete('/:id', usuariosController.eliminar); 
// DELETE /usuarios/:id -> elimina un usuario según su ID

router.post('/login', usuariosController.login); 
// POST /usuarios/login -> login de usuario, devuelve JWT

module.exports = router; 
// Exporta el router para usarlo en server.js
