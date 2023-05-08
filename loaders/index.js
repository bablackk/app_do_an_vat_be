const expressLoader = require("./express");
const databaseLoader = require("./mongodb");

module.exports = async (app) => {
  await expressLoader(app);
  await databaseLoader();
};
