"use strict";

const dotenv = require("dotenv");
dotenv.config({ path: "environments/.env", encoding: "utf-8" });

var express = require("express");
var app = express();
var log4js = require("log4js");
const routes = require("./routes/routes");
var bodyParser = require("body-parser");
const mc = require("./dao/mongoClient");

log4js.configure({
    appenders: {
        console: {
            type: "console",
        },
    },
    categories: {
        default: {
            appenders: ["console"],
            level: "info",
        },
    },
});

async function loadRoutes() {
    routes.assignRoutes(app);
}

module.exports = app;

try {
  var logger = log4js.getLogger("ex-afja-api/index.js");
  app.use(
    bodyParser.urlencoded({
      limit: "5000mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use(bodyParser.json({ limit: "5000mb", extended: true }));

  loadRoutes();

  app.timeout = 120000;
} catch (error) {
    logger.error(error);
}
