// back-end/controllers/containerController.js
const Container = require("../models/containers");
const User = require("../models/users");
const {
  sendContainerConfirmation,
  sendContainerUpdated,
  sendContainerDeleted,
} = require("../services/emailService");

/* ------------------------- helpers ------------------------- */

function normalizeYMD(d) {
  const dt = new Date(d);
  dt.setHours(0, 0, 0, 0);
  return dt;
}

function validateEtdEtaStrict(departure_date, arrival_date) {
  if (!departure_date || !arrival_date) return;

  const etd = normalizeYMD(departure_date);
  const eta = normalizeYMD(arrival_date);

  if (Number.isNaN(etd.getTime()) || Number.isNaN(eta.getTime())) {
    const bad = Number.isNaN(etd.getTime()) ? "ETD" : "ETA";
    const err = new Error(`${bad} date is invalid.`);
    err.statusCode = 400;
    throw err;
  }

  if (etd >= eta) {
    const err = new Error("ETD (departure) must be before ETA (arrival).");
    err.statusCode = 400;
    throw err;
  }
}

/* ------------------------- controllers ------------------------- */

// POST /api/containers/addcontainer
exports.addContainer = async (req, res) => {
  const {
    container_number,
    arrival_date,    // ETA
    departure_date,  // ETD
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

  try {
    const required = [
      "container_number",
      "arrival_date",
      "departure_date",
      "ship_name",
      "ship_voyage",
      "BL_number",
      "consignee",
      "shipper",
      "origin_port",
      "destination_port",
      "user_id",
    ];
    for (const f of required) {
      if (!req.body[f]) {
        const err = new Error(`${f.replace(/_/g, " ")} is required.`);
        err.statusCode = 400;
        throw err;
      }
    }

    validateEtdEtaStrict(departure_date, arrival_date);

    const insertSql = `
      INSERT INTO Container (
        container_number, arrival_date, departure_date, ship_name, ship_voyage,
        BL_number, consignee, shipper, origin_port, destination_port, status, user_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      container_number, arrival_date, departure_date, ship_name, ship_voyage,
      BL_number, consignee, shipper, origin_port, destination_port, status || "expected", user_id,
    ];

    const [result] = await Container.executeQuery(insertSql, params);

    // Fire-and-forget email + log
    (async () => {
      try {
        const user = await User.findUserById(user_id);
        if (user?.email) {
          await sendContainerConfirmation(
            user.email,
            container_number,
            {
              BL_number, ship_name, ship_voyage, origin_port, destination_port,
              departure_date, arrival_date, consignee, shipper, status: status || "expected",
              user_id,
              container_id: result.insertId,
            },
            { user_id, container_id: result.insertId } // 👈 ensure Notification row
          );
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
    return res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Error adding container." });
  }
};

// GET /api/containers/user/:userId
exports.getContainersByUserId = async (req, res) => {
  try {
    const [rows] = await Container.executeQuery(
      "SELECT * FROM Container WHERE user_id = ?",
      [req.params.userId]
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching containers by user:", err.message);
    return res.status(500).json({ message: "Error fetching containers." });
  }
};

// GET /api/containers/:id
exports.getContainerById = async (req, res) => {
  try {
    const [rows] = await Container.executeQuery(
      "SELECT * FROM Container WHERE id = ?",
      [req.params.id]
    );
    if (!rows.length) {
      return res.status(404).json({ message: "Container not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error fetching container:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/containers
exports.getAllContainers = async (_req, res) => {
  try {
    const [rows] = await Container.executeQuery("SELECT * FROM Container");
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching all containers:", err.message);
    return res.status(500).json({ message: "Error fetching containers." });
  }
};

// GET /api/containers/filter
exports.getFilteredContainers = async (req, res) => {
  const { container, bl, etd, eta } = req.query;
  try {
    let query = "SELECT * FROM Container WHERE 1=1";
    const params = [];

    if (container) {
      query += " AND container_number LIKE ?";
      params.push(`%${container}%`);
    }
    if (bl) {
      query += " AND BL_number LIKE ?";
      params.push(`%${bl}%`);
    }
    if (etd) {
      query += " AND departure_date = ?";
      params.push(etd);
    }
    if (eta) {
      query += " AND arrival_date = ?";
      params.push(eta);
    }

    const [rows] = await Container.executeQuery(query, params);
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching containers:", err.message);
    return res.status(500).json({ message: "Error fetching containers." });
  }
};

// PUT /api/containers/:id
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
    if (arrival_date && departure_date) {
      validateEtdEtaStrict(departure_date, arrival_date);
    }

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

    // Pull user/email and notify + log
    const [rows] = await Container.executeQuery(
      "SELECT user_id, container_number FROM Container WHERE id=?",
      [id]
    );
    const uid = rows?.[0]?.user_id;
    const cnum = rows?.[0]?.container_number || container_number;

    (async () => {
      try {
        if (!uid) return;
        const user = await User.findUserById(uid);
        if (!user?.email) return;

        await sendContainerUpdated(
          user.email,
          cnum,
          {
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
          },
          { user_id: uid, container_id: id } // 👈 ensure Notification row
        );
      } catch (e) {
        console.error("Post-update email failed:", e.message);
      }
    })();

    return res.status(200).json({ message: "Container updated successfully." });
  } catch (err) {
    console.error("Error updating container:", err.message);
    return res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Error updating container." });
  }
};

// DELETE /api/containers/:id
exports.deleteContainerById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await Container.executeQuery(
      "SELECT container_number, user_id FROM Container WHERE id=?",
      [id]
    );
    const existing = rows?.[0];

    await Container.executeQuery("DELETE FROM Container WHERE id=?", [id]);

    (async () => {
      try {
        if (!existing?.user_id) return;
        const user = await User.findUserById(existing.user_id);
        if (!user?.email) return;
        await sendContainerDeleted(
          user.email,
          existing.container_number,
          { user_id: existing.user_id, container_id: null } // 👈 log row
        );
      } catch (e) {
        console.error("Post-delete email failed:", e.message);
      }
    })();

    return res.status(200).json({ message: "Container deleted successfully." });
  } catch (err) {
    console.error("Error deleting container:", err.message);
    return res.status(500).json({ message: "Error deleting container." });
  }
};

// PATCH /api/containers/:id/status
exports.updateContainerStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!status) {
      const err = new Error("status is required.");
      err.statusCode = 400;
      throw err;
    }

    await Container.executeQuery(
      "UPDATE Container SET status = ? WHERE id = ?",
      [status, id]
    );

    try {
      const [rows] = await Container.executeQuery(
        "SELECT user_id, container_number FROM Container WHERE id=?",
        [id]
      );
      const uid = rows?.[0]?.user_id;
      const cnum = rows?.[0]?.container_number;
      if (uid && cnum) {
        const user = await User.findUserById(uid);
        if (user?.email) {
          await sendContainerUpdated(
            user.email,
            cnum,
            { status },
            { user_id: uid, container_id: id } // 👈 log row
          );
        }
      }
    } catch (e) {
      console.error("Post-status-update email failed:", e.message);
    }

    return res.status(200).json({ message: "Status updated successfully." });
  } catch (err) {
    console.error("Error updating status:", err.message);
    return res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Error updating status." });
  }
};
