const Penalty = require("../models/penalty");
const Container = require("../models/containers");
const User = require("../models/users");
const { sendWarningEmail, sendPenaltyEmail } = require("../services/emailService");

exports.create = async (req, res) => {
  try {
    const {
      container_id,
      user_id,
      type = "warning", // "warning" | "penalty"
      reason,
      amount,
    } = req.body;

    if (!reason || amount == null) {
      return res.status(400).json({ message: "reason and amount are required." });
    }
    if (type !== "warning" && type !== "penalty") {
      return res.status(400).json({ message: "type must be 'warning' or 'penalty'." });
    }

  
    let uid = user_id ?? null;
    let containerNumber = null;

    if (container_id) {
      const [c1] = await Container.executeQuery(
        "SELECT id, user_id, container_number FROM Container WHERE id=?",
        [container_id]
      );
      const row = c1?.[0];
      if (!row) return res.status(404).json({ message: "Container not found." });
      containerNumber = row.container_number || null;
      if (!uid) uid = row.user_id ?? null;
    }

    // Insert the record
    const id = await Penalty.add({
      container_id: container_id || null,
      user_id: uid,
      type,
      reason,
      amount,
    });


    (async () => {
      try {
        if (!uid) return;
        const user = await User.findUserById(uid);
        const toEmail = user?.email;
        if (!toEmail) return;

        const emailData = { reason, amount, containerNumber };
        const logMeta = { user_id: uid, container_id: container_id || null };

        if (type === "warning") {
          await sendWarningEmail(toEmail, emailData, logMeta);
        } else {
          await sendPenaltyEmail(toEmail, emailData, logMeta);
        }
      } catch (e) {
        console.error("post-penalty email failed:", e.message);
      }
    })();

    return res.status(201).json({ message: "Created", penaltyId: id });
  } catch (e) {
    console.error("create penalty error:", e.message);
    return res.status(500).json({ message: "Error creating penalty." });
  }
};


//possible extentions of the information system
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
