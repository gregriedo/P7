const mysql = require('mysql');
const config = require("./configuration/configuration.js");

//Création de la connexion à MYSQL
let con = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
  port: config.PORT

});

//Connexion à MYSQL
con.connect(error => {
  if (error) throw error;
  console.log("Connexion à MySQL réussie !");

});
 
module.exports = con;
