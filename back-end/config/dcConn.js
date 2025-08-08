const mysql = require("mysql2/promise");
require("dotenv").config();

const conn = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

console.log("DATABASE DETAILS:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  SMTP_user: process.env.SMTP_USER,
  SMTP_pass_length: process.env.SMTP_PASS?.length,
});

module.exports = conn;
