const { Sequelize, DataTypes, Op } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(process.env.DB_dbname, process.env.DB_user, process.env.DB_pss, {
  dialect: "postgres",
  host: process.env.DB_host,
  port: process.env.DB_port,
  minifyAliases: true,
  // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
});

module.exports = {
  sequelize,
  Sequelize,
  Op,
  DataTypes
};