const { Shop } = require( "../models/models" );
const ApiError = require( "../error/ApiError" );

class ShopController
{
  async create ( req, res, next )
  {
    try
    {
      const { name } = req.body;
      const shop = await Shop.create( { name } );
      return res.status( 201 ).json( shop );
    } catch ( error )
    {
      next( ApiError.badRequest( error.message ) );
    }
  }

  async getAll ( req, res, next )
  {
    try
    {
      const shops = await Shop.findAll();
      return res.json( shops );
    } catch ( error )
    {
      next( ApiError.internal( error.message ) );
    }
  }

  async getOne ( req, res, next )
  {
    try
    {
      const { id } = req.params;
      const shop = await Shop.findByPk( id );
      if ( !shop )
      {
        return next( ApiError.notFound( "Магазин не найден" ) );
      }
      return res.json( shop );
    } catch ( error )
    {
      next( ApiError.internal( error.message ) );
    }
  }

  async update ( req, res, next )
  {
    try
    {
      const { id } = req.params;
      const { name } = req.body;

      const shop = await Shop.findByPk( id );
      if ( !shop )
      {
        return next( ApiError.notFound( "Магазин не найден" ) );
      }

      await Shop.update( { name }, { where: { id } } );
      return res.json( { message: "Информация о магазине обновлена" } );
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
      const shop = await Shop.findByPk( id );
      if ( !shop )
      {
        return next( ApiError.notFound( "Магазин не найден" ) );
      }

      await Shop.destroy( { where: { id } } );
      return res.json( { message: `Удалён магазин с id: ${ id }` } );
    } catch ( error )
    {
      next( ApiError.internal( error.message ) );
    }
  }
}

module.exports = new ShopController();
