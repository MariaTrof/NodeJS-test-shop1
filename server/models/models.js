const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Product extends Model {}
Product.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    plu: { type: DataTypes.STRING, unique: true, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true }, 
  },
  {
    sequelize,
    modelName: "products",
    timestamps: false,
  }
);

class Shop extends Model {}
Shop.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true }, 
  },
  {
    sequelize,
    modelName: "shops",
    timestamps: false,
  }
);

class Stock extends Model {}
Stock.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
    },
    shop_id: {
      type: DataTypes.INTEGER,
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
  },
  {
    sequelize,
    timestamps: false,
    modelName: "stocks",
    hooks: {
      afterCreate: () => console.log("Таблица stocks была создана"),
    },
  }
);

class ActionHistory extends Model {}
ActionHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "products",
        key: "id",
      },
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "shops",
        key: "id",
      },
    },
    action: {
      type: DataTypes.STRING,
    },
    action_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "stocks",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "action_histories",
    hooks: {
      afterCreate: () => console.log("Таблица action_histories была создана"),
    },
  }
);

//определяем Элиасы (alias), которые потом вставляем в контроллер
//так же здесь находятся ассоциации в соотвествии с таблицами и их взаимосвязами

Stock.hasMany(ActionHistory, {
  foreignKey: "stock_id",
  as: "action_histories",
});
ActionHistory.belongsTo(Stock, { foreignKey: "stock_id", as: "stock" });

Product.hasMany(Stock, { foreignKey: "product_id", as: "stocks" });
Stock.belongsTo(Product, { foreignKey: "product_id", as: "product" });

Shop.hasMany(Stock, { foreignKey: "shop_id", as: "stocks" });
Stock.belongsTo(Shop, { foreignKey: "shop_id", as: "shop" });

Product.hasMany(ActionHistory, {
  foreignKey: "product_id",
  as: "action_histories",
});
ActionHistory.belongsTo(Product, { foreignKey: "product_id", as: "product" });

Shop.hasMany(ActionHistory, { foreignKey: "shop_id", as: "action_histories" });
ActionHistory.belongsTo(Shop, { foreignKey: "shop_id", as: "shop" });

module.exports = {
  Product,
  Shop,
  Stock,
  ActionHistory,
};
