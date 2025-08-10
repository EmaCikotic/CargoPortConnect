const Report = require("../models/report");
const {
  sendReportConfirmation,
  sendReportToAdmin,
} = require("../services/emailService");

// POST /api/reports
exports.addReport = async (req, res) => {
  console.log("CT:", req.headers["content-type"]);
  console.log("BODY:", req.body);
  console.log("FILES:", req.files?.length || 0);

  const {
    user_id,
    reporter_name,
    reporter_email,
    category,
    priority,
    subject,
    details,
  } = req.body;

  const hasAttachment = Array.isArray(req.files) && req.files.length > 0;

  if (!reporter_email || !subject || !details) {
    return res
      .status(400)
      .json({ message: "Email, subject and details are required." });
  }

  try {
    const insertSql = `
      INSERT INTO Report (
        user_id, reporter_name, reporter_email,
        category, priority, subject, details, has_attachment
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      user_id || null,
      reporter_name || null,
      reporter_email,
      category || "other",
      priority || "normal",
      subject,
      details,
      hasAttachment ? 1 : 0,
    ];

    
    const result = await Report.executeQuery(insertSql, params);
    const reportId = result.insertId;

    res.status(201).json({
      message: "Report submitted successfully",
      reportId,
    });

    // Fire-and-forget email sending
    (async () => {
      try {
        await sendReportToAdmin({ ...req.body, reportId }, req.files || []);
        await sendReportConfirmation(
          reporter_email,
          subject,
          details,
          req.files || []
        );
      } catch (err) {
        console.error("❌ Post-insert email failed:", err.message);
      }
    })();
  } catch (err) {
    console.error("❌ Error adding report:", err.message);
    res.status(500).json({ message: "Error submitting report." });
  }
};

// GET /api/reports
exports.getAllReports = async (_req, res) => {
  try {
    // ❗️DO NOT destructure – return value is already the rows array
    const rows = await Report.executeQuery(
      "SELECT * FROM Report ORDER BY created_at DESC"
      // If you don't have created_at, use: ORDER BY id DESC
    );
    res.status(200).json(Array.isArray(rows) ? rows : []);
  } catch (err) {
    console.error("❌ Error fetching reports:", err.message);
    res.status(500).json({ message: "Error fetching reports." });
  }
};

// GET /api/reports/user/:userId
exports.getReportsByUserId = async (req, res) => {
  try {
    // ❗️DO NOT destructure – return value is already the rows array
    const rows = await Report.executeQuery(
      "SELECT * FROM Report WHERE user_id = ? ORDER BY created_at DESC",
      [req.params.userId]
      // If you don't have created_at, use: ORDER BY id DESC
    );
    res.status(200).json(Array.isArray(rows) ? rows : []);
  } catch (err) {
    console.error("❌ Error fetching user reports:", err.message);
    res.status(500).json({ message: "Error fetching user reports." });
  }
};
