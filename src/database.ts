import * as pgPromise from 'pg-promise';

const pgp = pgPromise();
// declaring the connection to the database
const connection = 'postgres://postgres:@localhost:5432/s3c_db_dev';

export const db = pgp(connection);
// test the connection to the database
db.connect()
  .then(connResponse => {
    // console.log("Connected to Postgres Database");
  })
  .catch(error => {
    // console.error("ERROR:", error.message);
  });