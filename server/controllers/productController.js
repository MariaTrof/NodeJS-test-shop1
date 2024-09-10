const { Product, Shop, Stock, ActionHistory } = require("../models/models");
const ApiError = require("../error/ApiError");
const ActionHistoryController = require("./actionController");

class ProductController {
  async create ( req, res, next )
  {
    try
    {
      const { plu, name, shop_id } = req.body; // Добавлено shop_id
      const product = await Product.create( {
        plu,
        name,
      } );
      
      if ( shop_id )
      {
        await Stock.create( {
          product_id: product.id,
          shop_id: shop_id,
          quantity_on_shelf: 0,
          quantity_in_order: 0,
        } );
      }

      await ActionHistoryController.addAction( {
        product_id: product.id,
        action: "create",
        shop_id: shop_id, // Указывает на магазин
        stock_id: null,
      }, next );

      return res.json( product );
    } catch ( error )
    {
      console.error( "Error in create method:", error );
      next( ApiError.internal( error.message ) );
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
          { model: ActionHistory, as: "action_histories" },
        ],
      });

      return res.json({
        totalItems: products.count,
        totalPages: Math.ceil(products.count / limit),
        currentPage: page,
        items: products.rows,
      });
    } catch (error) {
      console.error("Error in create method:", error);
      next(ApiError.internal(error.message));
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id, {
        include: [
          { model: Stock, as: "stocks" },
          { model: ActionHistory, as: "action_histories" },
        ],
      });
      if (!product) {
        return next(ApiError.notFound("Не существует такого товара"));
      }
      return res.json(product);
    } catch (error) {
      console.error("Error in create method:", error);
      next(ApiError.internal(error.message));
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { name, plu } = req.body;

    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return next(ApiError.notFound("Не существует такого товара"));
      }

      const updatedProduct = await product.update({ name, plu });

      await ActionHistoryController.addAction({
        product_id: id,
        shop_id: null,
        action: "update",
      });

      return res.json(updatedProduct);
    } catch (error) {
      console.error("Error in create method:", error);
      next(ApiError.internal(error.message));
    }
  }

  async remove(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return next(ApiError.notFound("Не существует такого товара"));
      }

      await product.destroy();

      await ActionHistoryController.addAction({
        product_id: id,
        shop_id: null,
        action: "delete",
      });

      return res.json({ message: `Удалён товар с id: ${id}` });
    } catch (error) {
      console.error("Error in create method:", error);
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new ProductController();
