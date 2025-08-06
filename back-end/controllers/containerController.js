const Container = require("../models/containers");

// Add new container
exports.addContainer = async (req, res) => {
  const {
    container_number,
    arrival_date,
    departure_date,
    ship_name,
    ship_voyage,
    BL_number,
    consignee,
    shipper,
    origin_port,
    destination_port,
    status,
    user_id,
  } = req.body;

  console.log("Incoming data:", req.body);

  if (
    !container_number ||
    !arrival_date ||
    !departure_date ||
    !ship_name ||
    !ship_voyage ||
    !BL_number ||
    !consignee ||
    !shipper ||
    !origin_port ||
    !destination_port ||
    !user_id
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided." });
  }

  try {
    const insertQuery = `
      INSERT INTO Container (
        container_number,
        arrival_date,
        departure_date,
        ship_name,
        ship_voyage,
        BL_number,
        consignee,
        shipper,
        origin_port,
        destination_port,
        status,
        user_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      container_number,
      arrival_date,
      departure_date,
      ship_name,
      ship_voyage,
      BL_number,
      consignee,
      shipper,
      origin_port,
      destination_port,
      status || "expected",
      user_id,
    ];

    const [result] = await Container.executeQuery(insertQuery, params);

    return res.status(201).json({
      message: "Container added successfully",
      containerId: result.insertId,
    });
  } catch (err) {
    console.error("Error adding container:", err.message);
    return res.status(500).json({ message: "Error adding container." });
  }
};

// Get containers by user
exports.getContainersByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const query = "SELECT * FROM Container WHERE user_id = ?";
    const [rows] = await Container.executeQuery(query, [userId]);

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching containers by user:", err.message);
    return res.status(500).json({ message: "Error fetching containers." });
  }
};

// Get container by ID
exports.getContainerById = async (req, res) => {
  const containerId = req.params.id;

  try {
    const query = "SELECT * FROM Container WHERE id = ?";
    const [rows] = await Container.executeQuery(query, [containerId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Container not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error fetching container:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Filtering containers
exports.getFilteredContainers = async (req, res) => {
  const { container, bl, etd, eta } = req.query;

  try {
    let query = "SELECT * FROM Container WHERE 1=1";
    const params = [];

    if (container)
      (query += " AND container_number LIKE ?"), params.push(`%${container}%`);
    if (bl) (query += " AND BL_number LIKE ?"), params.push(`%${bl}%`);
    if (etd) (query += " AND departure_date = ?"), params.push(etd);
    if (eta) (query += " AND arrival_date = ?"), params.push(eta);

    const [rows] = await Container.executeQuery(query, params);
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching containers:", err.message);
    return res.status(500).json({ message: "Error fetching containers." });
  }
};
