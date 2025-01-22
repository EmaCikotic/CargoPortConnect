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

  // Validate required fields
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

    res.status(201).json({
      message: "Container added successfully",
      containerId: containerId,
    });
  } catch (err) {
    console.error("Error adding container:", err);
    res.status(500).json({ message: "Error adding container" });
  }
};
