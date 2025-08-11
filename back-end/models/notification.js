// back-end/models/notification.js
const connection = require("../config/dcConn");

// Simple model with a single insert
const Notification = {};

/**
 * Create a notification log row.
 * @param {number} user_id
 * @param {number|null} container_id
 * @param {string} type - e.g. "container_created" | "container_updated" | "container_deleted" | "status_changed" | "report_submitted"
 * @param {string} message
 * @param {string} [method="email"]
 * @returns {Promise<number>} insertId
 */
Notification.create = async (
  user_id,
  container_id = null,
  type,
  message,
  method = "email"
) => {
  try {
    const sql = `
      INSERT INTO Notification (user_id, container_id, type, message, method, sent_on)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const [res] = await connection.query(sql, [
      user_id,
      container_id,
      type,
      message,
      method,
    ]);
    return res.insertId;
  } catch (err) {
    console.error("[Notification.create] SQL error:", err);
    throw err;
  }
};

module.exports = Notification;
