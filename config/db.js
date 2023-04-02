'use strict';
const mysql = require('mysql');

// Conexión a la base de datos 
const con = mysql.createConnection({
  host     : '34.222.130.2', // Host
  user     : 'univar',      // Usuario 
  password : 'Univar98.',          // Password  
  database : 'db0122210055'
});

// Realizamos la conexión 
con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado a la Base de Datos !");
}); 

// Exportamos este módulo 
module.exports = con;