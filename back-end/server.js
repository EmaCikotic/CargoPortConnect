const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 8086;
//workplssss

app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Corrected: use backticks for template literals
});
