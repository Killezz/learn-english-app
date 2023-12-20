const database = require("./database/db.js");
const express = require("express");
var cors = require("cors");
const translationsRouter = require("./routes/translations.js");
const port = 80;
const app = express();
let server;

database
  .connect()
  .then(() => {
    console.log("MySQL: connection successful.");

    app.use(cors());
    app.use(express.static("./frontend/dist"));
    app.use("/api/translations", translationsRouter);

    // Start the server and listen on the specified port
    server = app
      .listen(port, () => {
        // Log a message to the console when the server starts
        console.log(`SERVER: listening on port ${port}.`);
      })
      .on("error", (err) => {
        console.error("SERVER: Error starting server:", err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error("MYSQL: Error connecting to MySQL:", err);
    process.exit(1);
  });

const gracefulShutdown = () => {
  console.log("SERVER: Starting graceful shutdown...");
  // Close the server
  if (server) {
    console.log("SERVER: Server was opened, so we can close it...");
    server.close((err) => {
      console.log("SERVER: stopped.");
      if (err) {
        console.error("SERVER: Could not close server, ", err);
      }
      console.log("MYSQL: Starting graceful shutdown...");
      database
        .close()
        .then(() => {
          console.log("MYSQL: Connection closed.");
        })
        .catch((err) => {
          console.error("MYSQL: Could not close connection, ", err);
        })
        .finally(() => {
          console.log("APPLICATION: Shutdown complete.");
          process.exit(1);
        });
    });
  }
};

process.on("SIGTERM", gracefulShutdown); // Some other app requirest shutdown.
process.on("SIGINT", gracefulShutdown); // ctrl-c
