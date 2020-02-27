const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",/**User from postgres */
  host: "localhost",
  database: "db_backlog", /**Database name */
  password: "password",  /**Password of postgres user */
  port: "5432"
});

module.exports = pool

