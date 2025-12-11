const fs = require("fs");
const path = require("path");
const rutaProductos = path.join(__dirname, "../data/productos.json");
const rutaCategorias = path.join(__dirname, "../data/categorias.json");

function leerJSON(ruta) {
  return JSON.parse(fs.readFileSync(ruta, "utf-8"));
}

function leer(ruta) {
  const data = fs.readFileSync(ruta, "utf-8");
  return JSON.parse(data);
}

function guardar(ruta, datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

// Listar productos con el nombre de la categoría
exports.listarConCategorias = () => {
  const productos = leer(rutaProductos);
  const categorias = leer(rutaCategorias);

  return productos.map((p) => {
    const categoria = categorias.find((c) => c.id === p.categoriaId);
    return {
      ...p,
      categoria: categoria ? categoria.nombre : "Sin categoría"
    };
  });
};

exports.buscarPorId = (id) => leer(rutaProductos).find((p) => p.id === id);

exports.crear = (nuevo) => {
  const datos = leer(rutaProductos);
  nuevo.id = datos.length ? Math.max(...datos.map((p) => p.id)) + 1 : 1;
  datos.push(nuevo);
  guardar(rutaProductos, datos);
  return nuevo;
};

exports.actualizar = (id, cambios) => {
  const datos = leer(rutaProductos);
  const index = datos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  datos[index] = { ...datos[index], ...cambios };
  guardar(rutaProductos, datos);
  return datos[index];
};

exports.eliminar = (id) => {
  const datos = leer(rutaProductos);
  const index = datos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const eliminado = datos.splice(index, 1);
  guardar(rutaProductos, datos);
  return eliminado[0];
};
