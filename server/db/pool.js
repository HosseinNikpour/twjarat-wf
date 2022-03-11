const pg = require("pg");

const databaseConfig = {
  user: "postgres",
  host: "localhost",
  database: "tejarat_wf",
  password: "Bl@@123",
  port: 5432,
};
const pool = new pg.Pool(databaseConfig);

module.exports = pool;
