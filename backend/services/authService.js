const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");
const User = require("../entities/User");

class AuthService {
  static async register(username, email, password) {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(null, username, email, hashedPassword);
    await UserModel.create(newUser);

    return { message: "User registered successfully" };
  }

  static async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return { message: "Login successful" };
  }
}

module.exports = AuthService;