const { Pool, Client } = require("pg");
const config = require("./db_config");
const tables = require("./tables");

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});
const client = new Client({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});
//const pool = new Pool(config);
// const client = new Client(config);
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
