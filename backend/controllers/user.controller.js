const db = require("../db");

class UserController {
    async getUsers(req, res) {
        const users = await db.query("SELECT username, email, id FROM users");
        res.json(users.rows);
    }

    async getOneUser(req, res) {
        const userId = req.params.id;
        const user = await db.query("SELECT username, email, id FROM users WHERE id = $1", [userId]);
        res.json(user.rows);
    }

    async updateUser(req, res) {
        const {userId, email, password, username} = req.body;
        const user = await db.query("UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [
            username, email, password, userId
        ]);
        res.json(user.rows)
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        const deletedUser = await db.query("DELETE FROM users WHERE id = $1", [userId]);
        res.json(deletedUser.rows);
    }
}

module.exports = new UserController();