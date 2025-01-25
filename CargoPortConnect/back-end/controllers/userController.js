const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/users");

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name, email, and password" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const userId = await User.createUser({
      name,
      email,
      password: hashedPassword,
    });

    console.log("Registered user ID:", userId); // Debugging

    return res.status(201).json({
      message: "User registered successfully",
      user_id: userId, // Return the user ID
    });
  } catch (err) {
    console.error("Error in registration:", err);
    return res
      .status(500)
      .json({ message: "Error registering the user", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received:", req.body); // Log the incoming request

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findUserByEmail(email);
    console.log("Fetched user from DB:", user); // Log the fetched user

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isPasswordValid); // Log comparison result

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = { userId: user.id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) {
          console.error("JWT generation error:", err);
          return res.status(500).json({ message: "Token generation failed" });
        }

        console.log("Generated token:", token); // Log the generated token

        return res.status(200).json({
          message: "Login successful",
          token,
          user_id: user.id, // Send the user ID in the response
        });
      }
    );
  } catch (err) {
    console.error("Error during login:", err); // Log any errors
    return res.status(500).json({ message: "Internal server error" });
  }
};
