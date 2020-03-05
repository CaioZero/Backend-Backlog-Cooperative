//const Pool = require('pg').Pool;
//const pool = new Pool({
  //user: "postgres",/**User from postgres */
  //host: "localhost",/**/
  //database: "db_backlog", /**Database name */
  //password: "password",  /**Password of postgres user */
  //port: "5432"
//})
//module.exports = pool

const Sequelize = require(`sequelize`)
const dbConfig = require('../config/dbConfig')

const connection = new Sequelize(dbConfig)

const User = require(`../models/User`)

User.init(connection)
/*const Address = require(`../models/Address`)

User.init(connection)/**inicializar o Model user conectado ao banco */
/* Address.init(connection)

User.associate(connection.models)
Address.associate(connection.models) */

module.exports = connection
