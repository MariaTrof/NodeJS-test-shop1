const { Stock, Product, Shop, ActionHistory } = require("../models/models");
const ApiError = require("../error/ApiError");
const ActionHistoryController = require("./actionController");

class StockController {
  async create(req, res, next) {
    try {
      const { id, product_id, shop_id, quantity_on_shelf, quantity_in_order } =
        req.body;

      const stock = await Stock.create({
        id,
        product_id,
        shop_id,
        quantity_on_shelf,
        quantity_in_order,
      });

      await ActionHistoryController.addAction({
        product_id,
        shop_id,
        action: "created",
      });

      return res.status(201).json(stock);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async increase(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity_on_shelf = 0, quantity_in_order = 0 } = req.body;

      const stock = await Stock.findByPk(id);
      if (!stock) {
        return next(ApiError.notFound("Не существует такого остатка"));
      }

      stock.quantity_on_shelf += quantity_on_shelf;
      stock.quantity_in_order += quantity_in_order;
      await stock.save();

      await ActionHistoryController.addAction({
        product_id: stock.product_id,
        shop_id: stock.shop_id,
        action: "increased",
      });

      return res.json(stock);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async decrease(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity_on_shelf = 0, quantity_in_order = 0 } = req.body;

      const stock = await Stock.findByPk(id);
      if (!stock) {
        return next(ApiError.notFound("Не существует такого остатка"));
      }

      stock.quantity_on_shelf = Math.max(
        0,
        stock.quantity_on_shelf - quantity_on_shelf
      );
      stock.quantity_in_order = Math.max(
        0,
        stock.quantity_in_order - quantity_in_order
      );
      await stock.save();

      await ActionHistoryController.addAction({
        product_id: stock.product_id,
        shop_id: stock.shop_id,
        action: "decreased",
      });

      return res.json(stock);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const stocks = await Stock.findAll();
      /*
      include: [
          { model: Product, as: "product" }, // Используем алиас "product"
          { model: Shop, as: "shop" }, // Используем алиас "shop"
          { model: ActionHistory, as: "action_history" },
        ], */

      return res.json(stocks);
      /*  totalItems: stocks.count,
        totalPages: Math.ceil( stocks.count / limit ),
        currentPage: page,
        items: stocks.rows, */
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const stock = await Stock.findOne({
        where: { id },
        include: [
          { model: Product, as: "product" },
          { model: Shop, as: "shop" },
          { model: ActionHistory, as: "action_history" },
        ],
      });

      if (!stock) {
        return next(ApiError.notFound("Не существует такого остатка"));
      }

      return res.json(stock);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const stock = await Stock.findOne({ where: { id } });
      if (!stock) {
        return next(ApiError.notFound("Не существует такого остатка"));
      }

      await Stock.destroy({ where: { id } });

      await ActionHistoryController.addAction({
        product_id: stock.product_id,
        shop_id: stock.shop_id,
        action: "deleted",
      });

      return res.json({ message: `Удалён остаток с id: ${id}` });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new StockController();
