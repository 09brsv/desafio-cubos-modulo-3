const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = {
  consulta: async (query, params) => {
    return await pool.query(query, params);
  },
};
