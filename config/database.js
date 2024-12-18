const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,     
  user: process.env.USR,     
  password: process.env.PASSWORD, 
  database: process.env.DB, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool for use in other files and ensure it's using the promise API
module.exports = pool.promise();