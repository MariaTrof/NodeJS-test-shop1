const { Sequelize } = require("sequelize");
const fs = require( 'fs' );
const path = require( 'path' );


const logger = fs.createWriteStream( path.join( __dirname, 'sequelize.log' ), { flags: 'a' } );

const sequelize = new Sequelize("nodejs_shop", "postgres", "12345", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  logging: ( msg ) => logger.write( `${ msg }\n` ),
});



module.exports = sequelize; 