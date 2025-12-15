const fs = require("fs");
const path = require("path");
const rutaUsuarios = path.join(__dirname, "../data/usuarios.json");

// Función para leer archivos JSON
function leer(ruta) {
  const data = fs.readFileSync(ruta, "utf-8");
  return JSON.parse(data);
}

// Función para guardar datos en un archivo JSON
function guardar(ruta, datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

// Listar todos los usuarios
exports.listar = () => {
  return leer(rutaUsuarios);
};

// Buscar un usuario por su ID
exports.buscarPorId = (id) => {
  return leer(rutaUsuarios).find((u) => u.id === id);
};

// Crear un nuevo usuario
exports.crear = (nuevo) => {
  const datos = leer(rutaUsuarios);
  nuevo.id = datos.length ? Math.max(...datos.map((u) => u.id)) + 1 : 1;
  datos.push(nuevo);
  guardar(rutaUsuarios, datos);
  return nuevo;
};

// Actualizar un usuario
exports.actualizar = (id, cambios) => {
  const datos = leer(rutaUsuarios);
  const index = datos.findIndex((u) => u.id === id);
  if (index === -1) return null;
  datos[index] = { ...datos[index], ...cambios };
  guardar(rutaUsuarios, datos);
  return datos[index];
};

// Eliminar un usuario
exports.eliminar = (id) => {
  const datos = leer(rutaUsuarios);
  const index = datos.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const eliminado = datos.splice(index, 1);
  guardar(rutaUsuarios, datos);
  return eliminado[0];
};
