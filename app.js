const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require("path") // Path 

const session = require('express-session');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false})); 

const flash = require('express-flash'); 
app.use(flash());

// EJS template engine 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Puerto 
const port = process.env.PORT || 3000;

// Peticiones de tipo application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Peticiones de tipo application/json
app.use(bodyParser.json());

// Bootstrap 5 (CSS y JS) 
app.use("/css",express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))
app.use("/js",express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))

// Rutas Front 
app.get('/', (req,res) => {
  var message = req.flash('message');  
  res.render('productos/index', {
    data: message, // Mensaje para cada tarea realizada 
  })
})
app.get('/crear', (req,res) => {  
  res.render('productos/crear')
})
app.get('/leer', (req,res) => {  
  res.render('productos/leer')
})
app.get('/actualizar', (req,res) => {  
  res.render('productos/actualizar')
})

app.get('/prove', (req,res) =>{
  res.render('proveedores/index')
});

app.get('/provecrear', (req,res) =>{
  res.render('proveedores/crear')
});

app.get('/proveleer', (req,res) => {
  res.render('proveedores/leer')
})

app.get('/proveact', (req, res) => {
  res.render('proveedores/actualizar')
});

// Rutas 
const ruta_productos = require('./routes/productos');
const proveRoutes = require('./routes/proveedores');
const con = require('./config/db');

// Usamos un Middleware 
app.use('/api/v1/productos', ruta_productos);
app.use('/api/v1/proveedores', proveRoutes);

// Directorio de las imágenes 
app.use("/uploads",express.static(path.join(__dirname, "uploads")))

//mongodb conection
mongoose
    .connect("mongodb+srv://DiegoRam:Su3AUECCOTGAYoV8@cluster0.acfmcou.mongodb.net/Examen?retryWrites=true&w=majority")
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

// Escuchamos las peticiones en el puerto establecido 
app.listen(port, () => {
  console.log(`La Aplicación está funcionando en el puerto ${port}`);
});