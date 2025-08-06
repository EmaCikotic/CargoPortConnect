const connection = require("../config/dcConn");

const User = {};

// Find user by email
User.findUserByEmail = async (email) => {
  try {
    const sql = `
      SELECT 
        id AS userId, 
        name, 
        surname,
        email, 
        password, 
        role 
      FROM User 
      WHERE email = ?
    `;
    const [rows] = await connection.query(sql, [email]);
    return rows.length > 0 ? rows[0] : null; // Return user object or null
  } catch (error) {
    console.error("Error finding user by email:", error.message);
    throw new Error("Database query error");
  }
};

// Create a new user
User.createUser = async (userData) => {
  const { name, surname, email, password, role } = userData;

  const insertUserSql = `
    INSERT INTO User (name, surname, email, password, role) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await connection.query(insertUserSql, [
    name,
    surname,
    email,
    password,
    role,
  ]);

  const userId = result.insertId;
  console.log(`New user inserted with ID: ${userId}`);
  return userId;
};

module.exports = User;
