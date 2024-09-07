const Router = require( "express" );
const router = new Router();

const actionRoute = require( "./actionRoute" );
const productRoute = require( "./productRoute" );
const stockRoute = require( "./stockRoute" );
const shopRoute = require( "./shopRoute" );

router.use( "/actions", actionRoute );
router.use( "/products", productRoute );
router.use( "/stock", stockRoute );
router.use( "/shops", shopRoute );

module.exports = router;

