require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8086;

// Middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRoutes");

// Routes
app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// Error handling
app.use((req, res, next) => {
  res.status(404).send("404: Page not found");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
