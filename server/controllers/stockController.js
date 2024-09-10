const { Stock, Product, Shop, ActionHistory } = require("../models/models");
const ApiError = require("../error/ApiError");
const ActionHistoryController = require("./actionController");

class StockController 
{
  async create ( req, res, next )
  {
    try
    {
      const { product_id, shop_id, quantity_on_shelf, quantity_in_order } = req.body;

      // Проверка существования товара и магазина
      const product = await Product.findByPk( product_id );
      const shop = await Shop.findByPk( shop_id );

      if ( !product )
      {
        return next( ApiError.notFound( "Товар не найден" ) );
      }

      if ( !shop )
      {
        return next( ApiError.notFound( "Магазин не найден" ) );
      }

      const stock = await Stock.create( {
        product_id,
        shop_id,
        quantity_on_shelf,
        quantity_in_order,
      } );

      await ActionHistoryController.addAction( {
        product_id: product_id,
        shop_id: shop_id,
        action: "create",
        stock_id: stock.id,
      }, next );

      return res.json( stock );
    } catch ( error )
    {
      console.error( "Ошибка при создании стока:", error );
      next( ApiError.internal( error.message ) );
    }
  }



  async increase(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity_on_shelf = 0, quantity_in_order = 0 } = req.body;

      const stocks = await Stock.findByPk(id);
      if (!stocks) {
        return next(ApiError.notFound("Не существует такого остатка"));
      }

      stocks.quantity_on_shelf += quantity_on_shelf;
      stocks.quantity_in_order += quantity_in_order;
      await stocks.save();

      await ActionHistoryController.addAction({
        product_id: stocks.product_id,
        shop_id: stocks.shop_id,
        action: "increased",
        stock_id: stocks.id,
      });

      return res.json(stocks);
    } catch (error) {
      console.error("Error in create method:", error);
      next(ApiError.internal(error.message));
    }
  }

  async decrease(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity_on_shelf = 0, quantity_in_order = 0 } = req.body;

      const stocks = await Stock.findByPk(id);
      if (!stocks) {
        return next(ApiError.notFound("Не существует такого остатка"));
      }

      stocks.quantity_on_shelf = Math.max(
        0,
        stocks.quantity_on_shelf - quantity_on_shelf
      );
      stocks.quantity_in_order = Math.max(
        0,
        stocks.quantity_in_order - quantity_in_order
      );
      await stocks.save();

      await ActionHistoryController.addAction(
        {
          product_id: stocks.product_id,
          shop_id: stocks.shop_id,
          action: "decreased",
          stock_id: stocks.id,
        },
        next
      );

      return res.json(stocks);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const stocks = await Stock.findAll();
      return res.json(stocks);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const stocks = await Stock.findOne({
        where: { id },
        include: [
          { model: Product, as: "products" },
          { model: Shop, as: "shops" },
          { model: ActionHistory, as: "action_histories" },
        ],
      });

      if (!stocks) {
        return next(ApiError.notFound("Не существует такого остатка"));
      }

      return res.json(stocks);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const stocks = await Stock.findOne({ where: { id } });
      if (!stocks) {
        return next(ApiError.notFound("Не существует такого остатка"));
      }

      await Stock.destroy({ where: { id } });

      await ActionHistoryController.addAction({
        product_id: stocks.product_id,
        shop_id: stocks.shop_id,
        action: "deleted",
        stock_id: stocks.id,
      });

      return res.json({ message: `Удалён остаток с id: ${id}` });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new StockController();
