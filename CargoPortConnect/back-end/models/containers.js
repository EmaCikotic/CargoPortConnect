const db = require("../config/dcConn");

const Container = {};

// Add a new container
Container.addContainer = async (data) => {
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
    user_id, 
  } = data;

  const query = `
    INSERT INTO containers (
      container_number, container_type, cargo_description, shipping_line,
      port_of_origin, port_of_destination, ship_name, voyage, etd, eta,
      bl_number, booking_number, hazardous_material, user_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
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
  ];

  const [result] = await db.query(query, params);
  return result.insertId; // Return the ID of the newly added container
};

// General query executor for filtering or fetching containers
Container.executeQuery = async (query, params) => {
  return db.query(query, params);
};

module.exports = Container;
