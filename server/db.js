const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodejs_shop", "postgres", "12345", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Успешное соединение с базой данных!");
  } catch (error) {
    console.error("Невозможно установить соединение с базой данных:", error);
  }
};

testConnection();

module.exports = sequelize; 