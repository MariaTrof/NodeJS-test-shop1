const { Product, Shop, Stock, ActionHistory } = require("../models/models");
const ApiError = require("../error/ApiError");
const ActionHistoryController = require("./actionController"); // Импорт контроллера истории действий

class ProductController {
  async create(req, res, next) {
    try {
      const { plu, name } = req.body;

      const product = await Product.create({
        plu,
        name,
      });

      await ActionHistoryController.addAction({
        product_id: product.id,
        shop_id: null,
        action: "create",
      });

      return res.status(201).json(product);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { limit, page, name, plu } = req.query;
      page = +page || 1;
      limit = +limit || 10;
      const offset = (page - 1) * limit;

      const whereConditions = {};
      if (name) {
        whereConditions.name = { [Op.like]: `%${name}%` };
      }
      if (plu) {
        whereConditions.plu = plu;
      }

      const products = await Product.findAndCountAll({
        where: whereConditions,
        limit,
        offset,
        include: [
          { model: Stock, as: "stocks" },
          { model: ActionHistory, as: "action_history" },
        ],
      });

      return res.json({
        totalItems: products.count,
        totalPages: Math.ceil(products.count / limit),
        currentPage: page,
        items: products.rows,
      });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id },
        include: [
          { model: Stock, as: "stocks" },
          { model: ActionHistory, as: "action_history" },
        ],
      });
      if (!product) {
        return next(ApiError.notFound("Не существует такого товара"));
      }
      return res.json(product);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, plu } = req.body;

      const product = await Product.findOne({ where: { id } });
      if (!product) {
        return next(ApiError.notFound("Не существует такого товара"));
      }

      const updatedProduct = await Product.update(
        { name, plu },
        { where: { id } }
      );

      await ActionHistoryController.addAction({
        product_id: id,
        shop_id: null,
        action: "update",
      });

      return res.json(updatedProduct);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ where: { id } });
      if (!product) {
        return next(ApiError.notFound("Не существует такого товара"));
      }

      await Product.destroy({ where: { id } });

      await ActionHistoryController.addAction({
        product_id: id,
        shop_id: null,
        action: "delete",
      });

      return res.json({ message: `Удалён товар с id: ${id}` });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new ProductController();
