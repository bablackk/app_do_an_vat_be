const express = require("express");
const { PORT } = require("./config");
const loaders = require("./loaders");
const app = express();
loaders(app);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
