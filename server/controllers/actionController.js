const { ActionHistory, Product, Shop } = require( "../models/models" );
const ApiError = require( "../error/ApiError" );
const { Op } = require( "sequelize" );

class ActionHistoryController
{
  async getAll ( req, res, next )
  {
    try
    {
      let { shop_id, product_id, action_date, action, page = 1, limit = 10 } = req.query;

      page = +page || 1; // Преобразование в число
      limit = +limit || 10; // Преобразование в число
      const offset = ( page - 1 ) * limit;
      console.log( offset, page, limit );

      let whereConditions = {};
      if ( shop_id )
      {
        whereConditions.shop_id = shop_id;
      }
      if ( action )
      {
        whereConditions.action = action;
      }
      if ( product_id )
      {
        whereConditions.product_id = product_id;
      }
      if ( action_date )
      {
        whereConditions.action_date = action_date;
      }

      console.log( whereConditions );
      console.log( action );

      const { count, rows } = await ActionHistory.findAndCountAll( {
        where: whereConditions,
        include: [
          { model: Product, as: "product" },
          { model: Shop, as: "shop" },
        ],
        limit,
        offset,
        order: [ [ "action_date", "DESC" ] ], // Обратите внимание, порядок сохраняется
      } );

      console.log( count, rows );
      console.log( "Запрос: ", whereConditions );

      return res.json( {
        totalItems: count,
        totalPages: Math.ceil( count / limit ),
        currentPage: page,
        items: rows,
      } );
    } catch ( error )
    {
      next( ApiError.internal( error.message ) );
    }
  }

  async addAction ( req, res, next )
  {
    try
    {
      const { product_id, shop_id, action } = req.body;

      const actionHistory = await ActionHistory.create( {
        product_id,
        shop_id,
        action,
        // action_date будет автоматически установлено на текущее время
      } );

      return res.status( 201 ).json( actionHistory );
    } catch ( error )
    {
      next( ApiError.badRequest( error.message ) );
    }
  }

  async getOne ( req, res, next )
  {
    try
    {
      const { id } = req.params;
      const actionHistory = await ActionHistory.findOne( {
        where: { id },
        include: [
          { model: Product, as: "product" },
          { model: Shop, as: "shop" },
        ],
      } );
      if ( !actionHistory )
      {
        return next( ApiError.notFound( "Не существует такого действия" ) );
      }
      return res.json( actionHistory );
    } catch ( error )
    {
      next( ApiError.internal( error.message ) );
    }
  }

  async remove ( req, res, next )
  {
    try
    {
      const { id } = req.params;
      const actionHistory = await ActionHistory.findOne( { where: { id } } );
      if ( !actionHistory )
      {
        return next( ApiError.notFound( "Не существует такого действия" ) );
      }

      await ActionHistory.destroy( { where: { id } } );

      return res.json( { message: `Удалено действие с id: ${ id }` } );
    } catch ( error )
    {
      next( ApiError.internal( error.message ) );
    }
  }
}

module.exports = new ActionHistoryController();
