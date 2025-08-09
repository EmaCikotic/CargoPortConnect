const connection = require("../config/dcConn");

const Container = {};

// Add new container 
Container.addContainer = async (data) => {
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
    user_id, // inferred from login
    status = "expected", // default value
  } = data;

  const insertSql = `
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

  const [result] = await connection.query(insertSql, [
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
  ]);

  return result.insertId;
};

Container.executeQuery = async (query, params) => {
  const [rows] = await connection.query(query, params);
  return [rows];
};

module.exports = Container;
