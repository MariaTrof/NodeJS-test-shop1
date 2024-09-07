require("dotenv").config();
const ErrorHandler = require("./middleware/ErrorHandler.js")
const express = require("express");
const sequelize = require("./db.js");
const cors = require("cors");
const router = require("./routes/router.js");
const path = require("path");
const bodyParser = require( "body-parser" );

const PORT = process.env.PORT || 5000;

const app = express();

app.use( bodyParser.json() );
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/favicon.ico", (req, res) => res.status(204));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", (req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.use("/api", router);

app.use( ErrorHandler );

const start = async () => {
  try
  {
    await sequelize.sync( { alter: false, force: false } ); // или { force: false }
    app.listen( PORT, () =>
      console.log( `Server has been started on port ${ PORT }` )
    );
  } catch ( error )
  {
    console.error( "Ошибка при запуске сервера:", error );
  }
};

start();
