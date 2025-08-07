require("dotenv").config();
const express = require("express");
const path = require("path");

const logger = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(logger("dev"));
/**app.use(
  cors({
    origin: "http://88.200.63.148:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);**/

app.use(
  cors({
    origin: true, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
//app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Import Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRoutes");
const containersRouter = require("./routes/containerRoutes");

// Routes
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/containers", containersRouter);

// Error handling for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "404: Page not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
