const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("your_database_name", "your_username", "your_password", {
  host: "localhost", // Change this to your actual PostgreSQL host
  dialect: "postgres",
  port: 5432,
  logging: false, // Set to true for debugging queries
});

module.exports = sequelize;
