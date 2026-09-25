require("dotenv").config({ override: true, quiet: true });

const { Pool } = require("pg");

const banco = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = banco;