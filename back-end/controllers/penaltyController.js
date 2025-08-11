
const Penalty = require("../models/penalty");
const Container = require("../models/containers");

exports.create = async (req, res) => {
  try {
    const {
      container_id,
      user_id,
      type = "warning",
      reason,
      amount,
    } = req.body;

    if (!reason || amount == null) {
      return res
        .status(400)
        .json({ message: "reason and amount are required." });
    }
    if (type !== "warning" && type !== "penalty") {
      return res
        .status(400)
        .json({ message: "type must be 'warning' or 'penalty'." });
    }

  
    let uid = user_id ?? null;
    if (!uid && container_id) {
      const [rows] = await Container.executeQuery(
        "SELECT user_id FROM Container WHERE id=?",
        [container_id]
      );
      uid = rows?.[0]?.user_id ?? null;
    }

    // verify container exists
    if (container_id) {
      const [cRows] = await Container.executeQuery(
        "SELECT id FROM Container WHERE id=?",
        [container_id]
      );
      if (!cRows.length)
        return res.status(404).json({ message: "Container not found." });
    }

    const id = await Penalty.add({
      container_id,
      user_id: uid,
      type,
      reason,
      amount,
    });
    res.status(201).json({ message: "Created", penaltyId: id });
  } catch (e) {
    console.error("create penalty error:", e.message);
    res.status(500).json({ message: "Error creating penalty." });
  }
};

exports.listAll = async (_req, res) => {
  try {
    const rows = await Penalty.listAll();
    res.json(rows);
  } catch (e) {
    console.error("listAll penalties error:", e.message);
    res.status(500).json({ message: "Error loading penalties." });
  }
};

exports.listForContainer = async (req, res) => {
  try {
    const rows = await Penalty.listForContainer(req.params.containerId);
    res.json(rows);
  } catch (e) {
    console.error("listForContainer error:", e.message);
    res.status(500).json({ message: "Error loading penalties for container." });
  }
};

exports.listForUser = async (req, res) => {
  try {
    const rows = await Penalty.listForUser(req.params.userId);
    res.json(rows);
  } catch (e) {
    console.error("listForUser error:", e.message);
    res.status(500).json({ message: "Error loading penalties for user." });
  }
};
