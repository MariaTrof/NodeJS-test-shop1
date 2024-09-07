const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Product = sequelize.define(
  "products",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    plu: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING },
  },
  {
    timestamps: false, // Отключить автоматическое добавление createdAt и updatedAt
  }
);

const Shop = sequelize.define(
  "shops",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  }
);

const Stock = sequelize.define("stock", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "products",
      key: "id",
    },
  },
  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "shops",
      key: "id",
    },
  },
  quantity_on_shelf: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  quantity_in_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

const ActionHistory = sequelize.define("action_history", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "products",
      key: "id",
    },
  },
  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "shops",
      key: "id",
    },
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  action_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

//определяем Элиасы (alias), которые потом вставляем в контроллер
//так же здесь находятся ассоциации в соотвествии с таблицами и их взаимосвязами

Stock.hasMany(ActionHistory, { foreignKey: "stock_id", as: "action_history" });
ActionHistory.belongsTo(Stock, { foreignKey: "stock_id", as: "stock" });

Product.hasMany(Stock, { foreignKey: "product_id", as: "stocks" });
Stock.belongsTo(Product, { foreignKey: "product_id", as: "product" });
//stock и stocks - это два разных Элиаса(псевдонима), это не является ошибкой,
//т.к. используются они для разного - один stock по id, а stocks для идентификации остатков в магазине
Shop.hasMany(Stock, { foreignKey: "shop_id", as: "stocks" });
Stock.belongsTo(Shop, { foreignKey: "shop_id", as: "shop" });

Product.hasMany(ActionHistory, {
  foreignKey: "product_id",
  as: "action_history",
});
ActionHistory.belongsTo(Product, { foreignKey: "product_id", as: "product" });

Shop.hasMany(ActionHistory, { foreignKey: "shop_id", as: "action_history" });
ActionHistory.belongsTo(Shop, { foreignKey: "shop_id", as: "shop" });

module.exports = {
  Product,
  Shop,
  Stock,
  ActionHistory,
};
