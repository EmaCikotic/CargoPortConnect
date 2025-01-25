const connection = require("../config/dcConn"); // Database connection

const User = {};

// Find user by email
User.findUserByEmail = async (email) => {
  try {
    const sql =
      "SELECT id AS userId, name, email, password FROM users WHERE email = ?";
    const [rows] = await connection.query(sql, [email]);
    return rows.length > 0 ? rows[0] : null; // Return user object (including userId) or null
  } catch (error) {
    console.error("Error finding user by email:", error.message);
    throw new Error("Database query error");
  }
};

User.createUser = async (userData) => {
  const { name, email, password } = userData;

  const insertUserSql =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const [result] = await connection.query(insertUserSql, [
    name,
    email,
    password,
  ]);

  const userId = result.insertId; // Get the ID of the inserted user
  console.log(`New user inserted with ID: ${userId}`); // Debugging log
  return userId; // Return the ID to the caller
};

module.exports = User;
