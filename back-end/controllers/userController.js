const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/users");

// Register a new user
exports.register = async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  if (!name || !surname || !email || !password || !role) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.createUser({
      name,
      surname,
      email,
      password: hashedPassword,
      role,
    });

    console.log("Registered user ID:", userId);

    return res.status(201).json({
      message: "User registered successfully",
      user_id: userId,
    });
  } catch (err) {
    console.error("Error in registration:", err);
    return res
      .status(500)
      .json({ message: "Error registering the user", error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findUserByEmail(email);
    console.log("Logged in user object:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user_id: user.userId,
      email: user.email,
      name: user.name,
      surname: user.surname,
      role: user.role,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
