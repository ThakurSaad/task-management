const app = require("./app");
const config = require("./config/config");

app.listen(config.port, config.base_url, () => {
  console.log(`Server is running on http://${config.base_url}:${config.port}`);
});
