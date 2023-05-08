const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("../api/routes");

module.exports = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  routes(app);
};
