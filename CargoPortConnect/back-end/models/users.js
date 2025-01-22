const connection = require("../config/dcConn"); // Ensure this is the correct variable name
const User = {};

User.createUser = async (userData) => {
  const { name, email, password } = userData;
  const checkEmailSql = "SELECT email FROM users WHERE email = ?";
  const [existingUser] = await pool.query(checkEmailSql, [email]);
  if (existingUser.length > 0) {
    throw new Error("Email already exists");
  }
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  try {
    const [result] = await connection.query(sql, [name, email, password]);
    return result.insertId;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

module.exports = User;
