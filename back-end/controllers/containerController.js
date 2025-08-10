const Container = require("../models/containers");
const User = require("../models/users");
const {
  sendContainerConfirmation,
  sendContainerUpdated,
  sendContainerDeleted,
} = require("../services/emailService");

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

    // fire-and-forget email (don’t block API response)
    (async () => {
      try {
        const user = await User.findUserById(user_id);
        if (user?.email) {
          await sendContainerConfirmation(user.email, container_number, {
            ship_name,
            ship_voyage,
            origin_port,
            destination_port,
            departure_date,
            arrival_date,
            BL_number,
            consignee,
            shipper,
            status,
          });
        }
      } catch (e) {
        console.error("Post-insert email failed:", e.message);
      }
    })();

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

//get all containers

exports.getAllContainers = async (req, res) => {
  try {
    const query = "SELECT * FROM Container";
    const [rows] = await Container.executeQuery(query);

    console.log("ROWS FROM DB:", rows);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching all containers:", err.message);
    res.status(500).json({ message: "Error fetching containers." });
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

// Update container by ID
// Update container by ID
exports.updateContainerById = async (req, res) => {
  const id = req.params.id;
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
  } = req.body;

  try {
    // 1) Update DB
    const updateSql = `
      UPDATE Container SET
        container_number=?, arrival_date=?, departure_date=?, ship_name=?,
        ship_voyage=?, BL_number=?, consignee=?, shipper=?, origin_port=?,
        destination_port=?, status=?
      WHERE id=?
    `;
    await Container.executeQuery(updateSql, [
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
      id,
    ]);

    // 2) Get user_id + container_number *from DB* (not from client)
    const [rows] = await Container.executeQuery(
      "SELECT user_id, container_number FROM Container WHERE id=?",
      [id]
    );
    const uid = rows?.[0]?.user_id; // <-- this was the bug (you read .id)
    const cnum = rows?.[0]?.container_number || container_number;

    // 3) Fire-and-forget email
    (async () => {
      try {
        if (!uid) {
          console.log("ℹ No user_id found for container", id);
          return;
        }
        const user = await User.findUserById(uid);
        if (!user?.email) {
          console.log("ℹ No email for user id", uid);
          return;
        }

        await sendContainerUpdated(user.email, cnum, {
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
        });

        console.log(`✅ Update email sent to ${user.email} for ${cnum}`);
      } catch (e) {
        console.error("Post-update email failed:", e.message);
      }
    })();

    res.status(200).json({ message: "Container updated successfully." });
  } catch (err) {
    console.error("Error updating container:", err.message);
    res.status(500).json({ message: "Error updating container." });
  }
};

// Delete container by ID
exports.deleteContainerById = async (req, res) => {
  const id = req.params.id;

  try {
    // read before delete so we know who to email + what number to show
    const [rows] = await Container.executeQuery(
      "SELECT container_number, user_id FROM Container WHERE id=?",
      [id]
    );
    const existing = rows?.[0];

    await Container.executeQuery("DELETE FROM Container WHERE id=?", [id]);

    //email
    (async () => {
      try {
        if (existing?.user_id) {
          const user = await User.findUserById(existing.user_id);
          if (user?.email) {
            await sendContainerDeleted(user.email, existing.container_number);
          }
        }
      } catch (e) {
        console.error("Post-delete email failed:", e.message);
      }
    })();

    res.status(200).json({ message: "Container deleted successfully." });
  } catch (err) {
    console.error("Error deleting container:", err.message);
    res.status(500).json({ message: "Error deleting container." });
  }
};