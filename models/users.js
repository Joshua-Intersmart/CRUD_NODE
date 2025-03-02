module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Users;
};
