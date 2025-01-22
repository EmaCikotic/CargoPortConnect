const connection = require("../config/dcConn"); // Database connection
const User = {};

User.findUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [rows] = await connection.query(sql, [email]);
  return rows.length > 0 ? rows[0] : null; // Return the user if found, otherwise null
};

User.createUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if the user already exists
  const existingUser = await User.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Insert the new user
  const insertUserSql =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const [result] = await connection.query(insertUserSql, [
    name,
    email,
    password,
  ]);
  return result.insertId;
};

module.exports = User;
