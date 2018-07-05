/**This file is for implementing the server
to listen for incoming connections*/
import config from './../config/config'
import app from './express'

//URL connection
//initizize library
const pgp = require('pg-promise')();
//declaring the connection to the database
const connection = "postgres://postgres:@localhost:5432/s3c_db_dev";
//create database object
const db = pgp(connection);
//connect to the database
db.connect()
.then(function (obj) {
      console.log("Connected to Postgres Database")
   })
   .catch(function (error) {
       console.log("ERROR:", error.message);
   });
//listen for the connection
app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})

//export the database module
module.exports = db;
