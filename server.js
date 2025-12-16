const express = require('express');
const cors = require('cors'); // Línea añadida para CORS
const app = express();

app.use(cors()); // Línea añadida para CORS
app.use(express.json());

// Importar rutas
app.use('/productos', require('./routes/productosRoutes'));
app.use('/clientes', require('./routes/clientesRoutes'));
app.use('/carritos', require('./routes/carritosRoutes'));
app.use('/pedidos', require('./routes/pedidosRoutes'));
app.use('/proveedores', require('./routes/proveedoresRoutes'));
app.use('/categorias', require('./routes/categoriasRoutes'));

// Rutas para usuarios
app.use('/usuarios', require('./routes/usuariosRoutes'));

// Mejora solicitada, guardar en un log de JSON todas las llamadas a la API
app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));

//isntale la lbirearia json web token y en usuarios cotnroller lo inclui