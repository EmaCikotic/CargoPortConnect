const nodemailer = require("nodemailer");
const { generateContainerPDF } = require("./PDFService");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_PORT) === "465",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

exports.sendContainerConfirmation = async (
  toEmail,
  containerNumber,
  details = {}
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
    console.log(`Email sent to ${toEmail} with PDF attachment`);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
};

exports.sendContainerUpdated = async (
  toEmail,
  containerNumber,
  details = {},
  attachPdf = false
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
  const pdfBuffer = await generateContainerPDF(containerNumber, details);

  const html = `
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
      <p style="color:#666;margin-top:10px">Thanks for using CargoPortConnect.</p>

      <p>Best regards </br>
      CargoPortConnectTeam</p>
      
    </div>
  `;

  const mail = {
    from: `"CargoPortConnect" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: `Container updated: ${containerNumber}`,
    html,
    attachments: [
      {
        filename: `${containerNumber}_details.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  /**if (attachPdf) {
    const pdfBuffer = await require("./PDFService").generateContainerPDF(
      containerNumber,
      details
    );
    mail.attachments = [
      { filename: `${containerNumber}_updated.pdf`, content: pdfBuffer },
    ];
  }**/

  await transporter.sendMail(mail);
};

exports.sendContainerDeleted = async (toEmail, containerNumber) => {
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
};
