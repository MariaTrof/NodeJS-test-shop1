const { ActionHistory, Product, Shop, Stock } = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");

class ActionHistoryController {
  async getAll(req, res, next) {
    try {
      let {
        shop_id,
        product_id,
        action_date,
        action,
        stock_id,
        page = 1,
        limit = 5,
      } = req.query;

      page = +page || 1;
      limit = +limit || 5;
      const offset = (page - 1) * limit;
      console.log(offset, page, limit);

      let whereConditions = {};
      if (shop_id) {
        whereConditions.shop_id = shop_id;
      }
      if (action) {
        whereConditions.action = action;
      }
      if (product_id) {
        whereConditions.product_id = product_id;
      }
      if (stock_id) {
        whereConditions.product_id = stock_id;
      }
      if (action_date) {
        whereConditions.action_date = action_date;
      }

      console.log(whereConditions);
      console.log(action);

      const { count, rows } = await ActionHistory.findAndCountAll({
        where: whereConditions,
        include: [
          { model: Product, as: "product" },
          { model: Shop, as: "shop" },
          { model: Stock, as: "stock" },
        ],
        limit,
        offset,
        order: [["action_date", "DESC"]],
      });

      console.log(count, rows);
      console.log("Запрос: ", whereConditions);

      return res.json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        items: rows,
      });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
  async addAction ( data )
  {
    try
    {
      const { product_id, shop_id, action, stock_id } = data;

      console.log( "Данные для добавления действия:", {
        product_id,
        shop_id,
        action,
        stock_id,
      } );

      const actionHistory = await ActionHistory.create( {
        product_id: product_id || null,
        shop_id: shop_id || null,
        action: action || "unknown", // Задаем значение по умолчанию для action
        stock_id: stock_id || null,
        action_date: new Date(),
      } );

      return actionHistory;
    } catch ( error )
    {
      console.error( "Ошибка в методе addAction:", error );
      throw ApiError.badRequest(
        "Ошибка при добавлении действия: " + error.message
      );
    }
  }


  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const actionHistory = await ActionHistory.findOne({
        where: { id },
        include: [
          { model: Product, as: "product" },
          { model: Shop, as: "shop" },
          { model: Stock, as: "stock" },
        ],
      });
      if (!actionHistory) {
        return next(ApiError.notFound("Не существует такого действия"));
      }
      return res.json(actionHistory);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const actionHistory = await ActionHistory.findOne({ where: { id } });
      if (!actionHistory) {
        return next(ApiError.notFound("Не существует такого действия"));
      }

      await ActionHistory.destroy({ where: { id } });

      return res.json({ message: `Удалено действие с id: ${id}` });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new ActionHistoryController();
