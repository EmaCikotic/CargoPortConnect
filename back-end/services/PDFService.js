const PDFDocument = require("pdfkit");

function addLine(doc, label, val) {
  doc.font("Helvetica-Bold").text(`${label}:`, { continued: true });
  doc.font("Helvetica").text(` ${val ?? "N/A"}`);
  doc.moveDown(0.5); //SPACING
}

exports.generateContainerPDF = (containerNumber, details = {}) => {
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

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const chunks = [];
  doc.on("data", (c) => chunks.push(c));

  return new Promise((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .fillColor("#5c146a")
      .text("CargoPortConnect", { align: "left" });

    doc.moveDown(0.5);
    doc
      .fontSize(14)
      .font("Helvetica")
      .fillColor("black")
      .text("Container Details", { align: "left" });

    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);

    // --- DETAILS SECTION ---
    doc.rect(50, doc.y, 495, 200).fill("#f9f9f9").stroke("#e0e0e0");
    doc.fillColor("black").fontSize(12);
    doc.x = 60;
    doc.y += 10;

    addLine(doc, "Container", containerNumber);
    addLine(doc, "B/L", BL_number);
    addLine(doc, "Ship", `${ship_name || "-"} (${ship_voyage || "-"})`);
    addLine(
      doc,
      "Route",
      `${origin_port || "-"} -> ${destination_port || "-"}`
    );
    addLine(doc, "ETD", departure_date || "-");
    addLine(doc, "ETA", arrival_date || "-");
    addLine(doc, "Consignee", consignee || "-");
    addLine(doc, "Shipper", shipper || "-");
    addLine(doc, "Status", status || "expected");

    doc.moveDown(2);

    // --- FOOTER ---
    doc
      .fontSize(10)
      .fillColor("#666")
      .text("Thanks for using CargoPortConnect.", { align: "left" });

    doc.end();
  });
};
