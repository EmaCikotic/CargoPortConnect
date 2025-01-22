// controllers/userController.js
const bcrypt = require("bcryptjs");
const User = require("../models/users");

exports.register = async (req, res) => {
  console.log("Request body:", req.body); // Debugging incoming data
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name, email, and password" });
  }

  if (email.length > 0)
    return res
      .status(400)
      .json({ message: "User with this email already exists!" });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: user });
  } catch (err) {
    console.error("Error in registration:", err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res
      .status(500)
      .json({ message: "Error registering the user", error: err.message });
  }
};
