const connection = require("../config/dcConn");

const Report = {};

// Add a new report
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

  const insertSql = `
    INSERT INTO Report (
      user_id,
      reporter_name,
      reporter_email,
      category,
      priority,
      subject,
      details,
      has_attachment
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await connection.query(insertSql, [
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

// Get all reports (for admin)
Report.getAllReports = async () => {
  const query = "SELECT * FROM Report ORDER BY created_at DESC";
  const [rows] = await connection.query(query);
  return rows;
};

// Get reports by user ID
Report.getReportsByUserId = async (userId) => {
  const query =
    "SELECT * FROM Report WHERE user_id = ? ORDER BY created_at DESC";
  const [rows] = await connection.query(query, [userId]);
  return rows;
};

// Get single report by ID
Report.getReportById = async (id) => {
  const query = "SELECT * FROM Report WHERE id = ?";
  const [rows] = await connection.query(query, [id]);
  return rows[0];
};

// Delete a report by ID
Report.deleteReportById = async (id) => {
  const query = "DELETE FROM Report WHERE id = ?";
  const [result] = await connection.query(query, [id]);
  return result.affectedRows > 0;
};

// Update report status
Report.updateReportStatus = async (id, status) => {
  const query = "UPDATE Report SET status = ? WHERE id = ?";
  const [result] = await connection.query(query, [status, id]);
  return result.affectedRows > 0;
};

// Reusable query executor
Report.executeQuery = async (query, params) => {
  const [rows] = await connection.query(query, params);
  return [rows];
};

module.exports = Report;
