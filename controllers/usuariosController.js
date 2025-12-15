const usuariosService = require('../services/usuariosService');

exports.obtenerTodos = (req, res) => {
  const usuarios = usuariosService.listar();
  res.json(usuarios);
};

exports.obtenerPorId = (req, res) => {
  const usuario = usuariosService.buscarPorId(parseInt(req.params.id));
  usuario ? res.json(usuario) : res.status(404).json({ mensaje: 'Usuario no encontrado' });
};

exports.crear = (req, res) => {
  const nuevo = usuariosService.crear(req.body);
  res.status(201).json(nuevo);
};

exports.actualizar = (req, res) => {
  const actualizado = usuariosService.actualizar(parseInt(req.params.id), req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'Usuario no encontrado' });
};

exports.eliminar = (req, res) => {
  const eliminado = usuariosService.eliminar(parseInt(req.params.id));
  eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'Usuario no encontrado' });
};
