// back-end/services/emailService.js
const nodemailer = require("nodemailer");
const { generateContainerPDF } = require("./PDFService");
const Notification = require("../models/notification");
const User = require("../models/users");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_PORT) === "465",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

transporter.verify((error) => {
  if (error) console.error("❌ SMTP connection error:", error);
  else console.log("✅ SMTP connection ready to send emails.");
});

// ---- helper: store a log row after a successful send
async function logEmailNotification(meta = {}) {
  try {
    const {
      user_id,
      container_id = null,
      type,
      message,
      method = "email",
    } = meta;

    if (!user_id || !type || !message) {
      console.warn("[logEmailNotification] missing fields", {
        user_id,
        type,
        message,
      });
      return;
    }
    const id = await Notification.create(
      user_id,
      container_id,
      type,
      message,
      method
    );
    // console.log("[logEmailNotification] inserted Notification id:", id);
    return id;
  } catch (e) {
    console.error("logEmailNotification failed:", e);
  }
}

/* ==========================
   Container emails
========================== */

exports.sendContainerConfirmation = async (
  toEmail,
  containerNumber,
  details = {},
  logMeta = {}
) => {
  const {
    BL_number,
    ship_name,
    ship_voyage,
    origin_port,
    destination_port,
    departure_date,
    arrival_date,
    consignee,
    shipper,
    status,
  } = details;

  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
      <h2 style="color:#5c146a;">Your container has been submitted!</h2>
      <table cellpadding="6" style="border-collapse:collapse;background:#fafafa;border:1px solid #eee">
        <tr><td><b>Container</b></td><td>${containerNumber}</td></tr>
        <tr><td><b>B/L</b></td><td>${BL_number || "N/A"}</td></tr>
        <tr><td><b>Ship</b></td><td>${ship_name || "-"} (${
    ship_voyage || "-"
  })</td></tr>
        <tr><td><b>Route</b></td><td>${origin_port || "-"} → ${
    destination_port || "-"
  }</td></tr>
        <tr><td><b>ETD</b></td><td>${departure_date || "-"}</td></tr>
        <tr><td><b>ETA</b></td><td>${arrival_date || "-"}</td></tr>
        <tr><td><b>Consignee</b></td><td>${consignee || "-"}</td></tr>
        <tr><td><b>Shipper</b></td><td>${shipper || "-"}</td></tr>
        <tr><td><b>Status</b></td><td>${status || "expected"}</td></tr>
      </table>
      <p style="color:#666;margin-top:10px">A PDF copy is attached.</p>
    </div>
  `;

  try {
    const pdfBuffer = await generateContainerPDF(containerNumber, details);
    await transporter.sendMail({
      from: `"CargoPortConnect" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Container ${containerNumber} Submission Confirmation`,
      html,
      attachments: [
        {
          filename: `${containerNumber}_details.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    await logEmailNotification({
      user_id: logMeta.user_id || details.user_id || null,
      container_id: logMeta.container_id ?? details.container_id ?? null,
      type: "container_created",
      message: `Email: Container ${containerNumber} submitted`,
      method: "email",
    });
  } catch (err) {
    console.error("Error sending container confirmation email:", err);
  }
};

exports.sendContainerUpdated = async (
  toEmail,
  containerNumber,
  details = {},
  logMeta = {}
) => {
  const {
    BL_number,
    ship_name,
    ship_voyage,
    origin_port,
    destination_port,
    departure_date,
    arrival_date,
    consignee,
    shipper,
    status,
  } = details;

  try {
    const pdfBuffer = await generateContainerPDF(containerNumber, details);

    await transporter.sendMail({
      from: `"CargoPortConnect" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Container updated: ${containerNumber}`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
          <h2 style="color:#5c146a;margin:0 0 10px">Your container was updated</h2>
          <p>The following details were updated on your container.</p>
          <table cellpadding="6" style="border-collapse:collapse;background:#fafafa;border:1px solid #eee">
            <tr><td><b>Container</b></td><td>${containerNumber}</td></tr>
            <tr><td><b>B/L</b></td><td>${BL_number ?? "N/A"}</td></tr>
            <tr><td><b>Ship</b></td><td>${ship_name ?? "-"} (${
        ship_voyage ?? "-"
      })</td></tr>
            <tr><td><b>Route</b></td><td>${origin_port ?? "-"} → ${
        destination_port ?? "-"
      }</td></tr>
            <tr><td><b>ETD</b></td><td>${departure_date ?? "-"}</td></tr>
            <tr><td><b>ETA</b></td><td>${arrival_date ?? "-"}</td></tr>
            <tr><td><b>Consignee</b></td><td>${consignee ?? "-"}</td></tr>
            <tr><td><b>Shipper</b></td><td>${shipper ?? "-"}</td></tr>
            <tr><td><b>Status</b></td><td>${status ?? "-"}</td></tr>
          </table>
        </div>
      `,
      attachments: [
        {
          filename: `${containerNumber}_details.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    await logEmailNotification({
      user_id: logMeta.user_id || details.user_id || null,
      container_id: logMeta.container_id ?? details.container_id ?? null,
      type: "container_updated",
      message: `Email: Container ${containerNumber} updated`,
      method: "email",
    });
  } catch (err) {
    console.error("Error sending container updated email:", err);
  }
};

exports.sendContainerDeleted = async (
  toEmail,
  containerNumber,
  logMeta = {}
) => {
  try {
    await transporter.sendMail({
      from: `"CargoPortConnect" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Container deleted: ${containerNumber}`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
          <h2 style="color:#5c146a;margin:0 0 10px">Your container was deleted</h2>
          <p>Container <b>${containerNumber}</b> has been removed from your collection.</p>
          <p style="color:#666;margin-top:10px">If you didn't request this, please contact support.</p>
        </div>
      `,
    });

    await logEmailNotification({
      user_id: logMeta.user_id || null,
      container_id: logMeta.container_id ?? null, // may be null after delete
      type: "container_deleted",
      message: `Email: Container ${containerNumber} deleted`,
      method: "email",
    });
  } catch (err) {
    console.error("Error sending container deleted email:", err);
  }
};

exports.sendReportConfirmation = async (
  toEmail,
  subject,
  details,
  attachments = [],
  logMeta = {}
) => {
  try {
    await transporter.sendMail({
      from: `"CargoPortConnect" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Report received: ${subject}`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
          <h2 style="color:#5c146a;margin:0 0 10px">We’ve received your report</h2>
          <p>Thanks for contacting CargoPortConnect. We’ll review your message and reply soon.</p>
          <h3>Report Summary</h3>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Details:</b></p>
          <p>${details}</p>
        </div>
      `,
      attachments: attachments.map((f) => ({
        filename: f.originalname,
        path: f.path,
      })),
    });

    await logEmailNotification({
      user_id: logMeta.user_id || null,
      container_id: null,
      type: "report_submitted",
      message: `Email: Report received · ${subject}`,
      method: "email",
    });
  } catch (err) {
    console.error("Error sending report confirmation:", err);
  }
};

exports.sendReportToAdmin = async (reportData, attachments = []) => {
  const {
    reporter_name: name,
    reporter_email: email,
    category,
    priority,
    containerNumber,
    subject,
    details,
  } = reportData;

  try {
    await transporter.sendMail({
      from: `"CargoPortConnect" <${process.env.SMTP_USER}>`,
      to: "cargoportconnect@gmail.com",
      subject: `📩 New Report: ${subject}`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
          <h2 style="color:#5c146a;margin:0 0 10px">New Report Submitted</h2>
          <table cellpadding="6" style="border-collapse:collapse;background:#fafafa;border:1px solid #eee">
            <tr><td><b>Name</b></td><td>${name || "-"}</td></tr>
            <tr><td><b>Email</b></td><td>${email}</td></tr>
            <tr><td><b>Category</b></td><td>${category}</td></tr>
            <tr><td><b>Priority</b></td><td>${priority}</td></tr>
            <tr><td><b>Container #</b></td><td>${
              containerNumber || "-"
            }</td></tr>
            <tr><td><b>Subject</b></td><td>${subject}</td></tr>
          </table>
          <p><b>Details:</b></p>
          <p>${details}</p>
        </div>
      `,
      attachments: attachments.map((f) => ({
        filename: f.originalname,
        path: f.path,
      })),
    });
  } catch (err) {
    console.error("Error sending admin report:", err);
  }
};

exports.sendContainerStatusChanged = async (
  toEmail,
  containerNumber,
  oldStatus,
  newStatus,
  meta = {},
  logMeta = {}
) => {
  const nice = (s) => String(s || "").replace(/_/g, " ");
  const {
    BL_number,
    origin_port,
    destination_port,
    departure_date,
    arrival_date,
  } = meta;

  try {
    await transporter.sendMail({
      from: `"CargoPortConnect" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Container ${containerNumber}: status changed to ${nice(
        newStatus
      )}`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
          <h2 style="color:#5c146a;margin:0 0 10px">Container status updated</h2>
          <p>The status of your container has changed.</p>
          <table cellpadding="6" style="border-collapse:collapse;background:#fafafa;border:1px solid #eee">
            <tr><td><b>Container</b></td><td>${containerNumber}</td></tr>
            ${
              BL_number
                ? `<tr><td><b>B/L</b></td><td>${BL_number}</td></tr>`
                : ""
            }
            <tr><td><b>Old status</b></td><td>${nice(oldStatus)}</td></tr>
            <tr><td><b>New status</b></td><td><b>${nice(
              newStatus
            )}</b></td></tr>
            ${
              origin_port || destination_port
                ? `<tr><td><b>Route</b></td><td>${origin_port || "-"} → ${
                    destination_port || "-"
                  }</td></tr>`
                : ""
            }
            ${
              departure_date
                ? `<tr><td><b>ETD</b></td><td>${departure_date}</td></tr>`
                : ""
            }
            ${
              arrival_date
                ? `<tr><td><b>ETA</b></td><td>${arrival_date}</td></tr>`
                : ""
            }
          </table>
        </div>
      `,
    });

    await logEmailNotification({
      user_id: logMeta.user_id || meta.user_id || null,
      container_id: logMeta.container_id ?? meta.container_id ?? null,
      type: "status_changed",
      message: `Email: Container ${containerNumber} status ${nice(
        oldStatus
      )} → ${nice(newStatus)}`,
      method: "email",
    });
  } catch (err) {
    console.error("Error sending status changed email:", err);
  }
};

// --- Warning & Penalty emails ---
exports.sendWarningEmail = async (
  toEmail,
  { reason, amount, containerNumber } = {},
  logMeta = {}
) => {
  try {
    await transporter.sendMail({
      from: `"CargoPortConnect" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Warning Issued `,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
          <h2 style="color:#cc6600;margin:0 0 10px">Account Warning</h2>
          ${
            containerNumber ? `<p><b>Container:</b> ${containerNumber}</p>` : ""
          }
          <p><b>Reason:</b> ${reason}</p>
          ${amount != null ? `<p><b>Amount:</b> ${amount}</p>` : ""}
          <p style="color:#666;margin-top:10px">Please address this to avoid further penalties.</p>
        </div>
      `,
    });

    
  } catch (err) {
    console.error("Error sending warning email:", err);
  }
};

exports.sendPenaltyEmail = async (
  toEmail,
  { reason, amount, containerNumber } = {},
  logMeta = {}
) => {
  try {
    await transporter.sendMail({
      from: `"CargoPortConnect" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Penalty Issued `,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
          <h2 style="color:#b30000;margin:0 0 10px">Account Penalty</h2>
          ${
            containerNumber ? `<p><b>Container:</b> ${containerNumber}</p>` : ""
          }
          <p><b>Reason:</b> ${reason}</p>
          ${amount != null ? `<p><b>Amount:</b> ${amount}</p>` : ""}
           <p style="color:#666;margin-top:10px">Expect an invoice in the next few days.</p>
          <p style="color:#666;margin-top:10px">Contact support if you believe this was a mistake.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Error sending penalty email:", err);
  }
};
