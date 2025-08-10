const connection = require("../config/dcConn");

const TABLE = "`Report`";

const Report = {};

// Create
Report.addReport = async (data) => {
  const {
    user_id,
    reporter_name,
    reporter_email,
    category,
    priority,
    subject,
    details,
    has_attachment,
  } = data;

  const sql = `
    INSERT INTO ${TABLE} (
      user_id, reporter_name, reporter_email,
      category, priority, subject, details, has_attachment
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await connection.query(sql, [
    user_id || null,
    reporter_name || null,
    reporter_email,
    category || "other",
    priority || "normal",
    subject,
    details,
    has_attachment ? 1 : 0,
  ]);

  return result.insertId;
};

// Read
Report.getAllReports = async () => {
  // If you don't have created_at, change to: ORDER BY id DESC
  const [rows] = await connection.query(
    `SELECT * FROM ${TABLE} ORDER BY created_at DESC`
  );
  return rows;
};

Report.getReportsByUserId = async (userId) => {
  const [rows] = await connection.query(
    `SELECT * FROM ${TABLE} WHERE user_id = ? ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
};

Report.getReportById = async (id) => {
  const [rows] = await connection.query(
    `SELECT * FROM ${TABLE} WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
};

// Update
Report.updateReportStatus = async (id, status) => {
  const [result] = await connection.query(
    `UPDATE ${TABLE} SET status = ? WHERE id = ?`,
    [status, id]
  );
  return result.affectedRows > 0;
};

// Delete
Report.deleteReportById = async (id) => {
  const [result] = await connection.query(
    `DELETE FROM ${TABLE} WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
};

// Generic executor — return raw result (rows for SELECT; header for writes)
Report.executeQuery = async (query, params = []) => {
  const [result] = await connection.query(query, params);
  return result;
};

module.exports = Report;
