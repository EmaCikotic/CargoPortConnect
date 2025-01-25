const Container = require("../models/containers");

exports.addContainer = async (req, res) => {
  const {
    container_number,
    container_type,
    cargo_description,
    shipping_line,
    port_of_origin,
    port_of_destination,
    ship_name,
    voyage,
    etd,
    eta,
    bl_number,
    booking_number,
    hazardous_material,
  } = req.body;

  if (
    !container_number ||
    !container_type ||
    !cargo_description ||
    !shipping_line ||
    !port_of_origin ||
    !port_of_destination ||
    !ship_name ||
    !voyage ||
    !etd ||
    !eta ||
    !bl_number ||
    !booking_number
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user_id = req.user.userId;

    const containerId = await Container.addContainer({
      container_number,
      container_type,
      cargo_description,
      shipping_line,
      port_of_origin,
      port_of_destination,
      ship_name,
      voyage,
      etd,
      eta,
      bl_number,
      booking_number,
      hazardous_material,
      user_id,
    });

    return res.status(201).json({
      message: "Container added successfully",
      containerId,
    });
  } catch (err) {
    console.error("Error adding container:", err.message);
    return res.status(500).json({ message: "Error adding container." });
  }
};

exports.getFilteredContainers = async (req, res) => {
  const { container, bl, booking, etd, eta } = req.query;

  try {
    let query = "SELECT * FROM containers WHERE 1=1";
    const params = [];

    if (container)
      (query += " AND container_number LIKE ?"), params.push(`%${container}%`);
    if (bl) (query += " AND bl_number LIKE ?"), params.push(`%${bl}%`);
    if (booking)
      (query += " AND booking_number LIKE ?"), params.push(`%${booking}%`);
    if (etd) (query += " AND etd = ?"), params.push(etd);
    if (eta) (query += " AND eta = ?"), params.push(eta);

    const [rows] = await Container.executeQuery(query, params);
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching containers:", err.message);
    return res.status(500).json({ message: "Error fetching containers." });
  }
};
