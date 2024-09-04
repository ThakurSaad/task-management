// index.js

const PORT = process.env.PORT || 3000;

const app = require("./app");

// Start the server
app.listen(PORT, "192.168.10.32", () => {
  console.log(`Server is running on http://192.168.10.32:${PORT}`);
});
