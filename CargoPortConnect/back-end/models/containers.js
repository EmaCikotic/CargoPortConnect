const db = require("../config/dcConn");

const Container = {};

// Add a new container
Container.addContainer = async (containerDetails) => {
  const {
    containerNumber,
    containerType,
    cargoDescription,
    shippingLine,
    portOfOrigin,
    portOfDestination,
    shipName,
    voyage,
    ETD,
    ETA,
    blNumber,
    bookingNumber,
    hazardousMaterial,
  } = containerDetails;

  const query = `
    INSERT INTO containers (
      container_number, container_type, cargo_description, shipping_line,
      port_of_origin, port_of_destination, ship_name, voyage, etd, eta,
      bl_number, booking_number, hazardous_material
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    containerNumber,
    containerType,
    cargoDescription,
    shippingLine,
    portOfOrigin,
    portOfDestination,
    shipName,
    voyage,
    ETD,
    ETA,
    blNumber,
    bookingNumber,
    hazardousMaterial,
    user_id,
  ];

  const [result] = await db.query(query, values);
  return result.insertId;
};

module.exports = Container;
