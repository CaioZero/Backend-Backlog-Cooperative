module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'password',
    database: 'db_backlog_sequelize',
    define: {
      timestamps: true,
      underscored: true,
    },
  };