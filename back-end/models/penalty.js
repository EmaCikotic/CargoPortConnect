// back-end/models/penalty.js
const connection = require("../config/dcConn");

const Penalty = {};

// Create warning/penalty
Penalty.add = async ({
  container_id = null,
  user_id = null,
  type = "warning",
  reason,
  amount,
}) => {
  const sql = `
    INSERT INTO Penalty (container_id, user_id, type, issued_on, reason, amount)
    VALUES (?, ?, ?, NOW(), ?, ?)
  `;
  const [result] = await connection.query(sql, [
    container_id || null,
    user_id || null,
    type,
    reason,
    amount,
  ]);
  return result.insertId;
};

Penalty.listAll = async () => {
  const [rows] = await connection.query(
    `SELECT p.*, c.container_number
     FROM Penalty p
     LEFT JOIN Container c ON c.id = p.container_id
     ORDER BY p.issued_on DESC`
  );
  return rows;
};

Penalty.listForContainer = async (containerId) => {
  const [rows] = await connection.query(
    `SELECT p.*
     FROM Penalty p
     WHERE p.container_id = ?
     ORDER BY p.issued_on DESC`,
    [containerId]
  );
  return rows;
};

Penalty.listForUser = async (userId) => {
  const [rows] = await connection.query(
    `SELECT p.*, c.container_number
     FROM Penalty p
     LEFT JOIN Container c ON c.id = p.container_id
     WHERE p.user_id = ?
     ORDER BY p.issued_on DESC`,
    [userId]
  );
  return rows;
};

// consistent helper
Penalty.executeQuery = async (q, params) => {
  const [rows] = await connection.query(q, params);
  return [rows];
};

module.exports = Penalty;
