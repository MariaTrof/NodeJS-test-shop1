const express = require( "express" );
const router = express.Router();

const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require( "../controllers/shopController" );

router.post( "/", create );
router.get( "/", getAll );
router.get( "/:id", getOne );
router.put( "/:id", update );
router.delete( "/:id", remove );

module.exports = router;
