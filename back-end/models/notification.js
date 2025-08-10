// back-end/models/notification.js
const connection = require("../config/dcConn");

const Notification = {};

Notification.create = async ({
  user_id,
  container_id = null,
  type,
  message,
  method = "email",
}) => {
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
};

module.exports = Notification;
