const { Sequelize, DataTypes, Op } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(process.env.DB_dbname, process.env.DB_user, process.env.DB_pss, {
  dialect: "postgres",
  host: process.env.DB_host,
  port: process.env.DB_port,
  minifyAliases: true,
  logging: true,
  // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
});

const db = {}
db.Users = require("./users")(sequelize, Sequelize);
db.Products = require("./products")(sequelize, Sequelize);

db.Users.hasMany(db.Products, { foreignKey: "created_by", as: "created_products" });
db.Products.hasMany(db.Users, { foreignKey: "created_by", as: "created_use" });

module.exports = {
  sequelize,
  Sequelize,
  Op,
  DataTypes,
  db
};