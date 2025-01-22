const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  next();
};

router.post("/register", validateRegister, userController.register);
//router.post("/login", validateLogin, userController.login);
router.post("/login", (req, res) => {
  console.log("Login route hit");
  res.status(200).json({ message: "Login route works!" });
});

module.exports = router;
