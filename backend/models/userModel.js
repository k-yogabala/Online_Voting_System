const db = require("../config/db");
const User = require("../entities/User");

class UserModel {
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length ? new User(rows[0].id, rows[0].username, rows[0].email, rows[0].password) : null;
  }

  static async create(user) {
    return db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
      [user.username, user.email, user.password]);
  }
}

module.exports = UserModel;