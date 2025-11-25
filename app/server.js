const app = require("./app");
const config = require("./config/config");

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

const server = app.listen(config.port, () => {
  console.log(
    `Server is running on http://${config.base_url || "localhost"}:${
      config.port
    }`
  );
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
