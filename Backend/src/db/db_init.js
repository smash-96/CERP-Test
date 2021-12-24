const { Pool, Client } = require("pg");
const config = require("./db_config");
const tables = require("./tables");

const pool = new Pool(config);
const client = new Client(config);
client.connect();

const createTables = async (query) => {
  try {
    await client.query(query);
  } catch (error) {
    console.error(error.stack);
  }
};

createTables(tables.List);
createTables(tables.Item);

module.exports = pool;
