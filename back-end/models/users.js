const connection = require("../config/dcConn");
const User = {};

User.createUser = (userData) => {
  const { name, email, password } = userData;
  const sql = `
        INSERT INTO User (name, email, password) VALUES (?, ?, ?)
    `;
  return conn
    .query(sql, [name, email, password])
    .then(([result]) => {
      console.log("User creation successful:", result);
      return result;
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      throw err;
    });
};

module.exports = User;
