const db = require("../db");

class PostController {
    async createPost(req, res) {
        try{
            const {user_id, title, description, content} = req.body;
            const date = new Date()

            await db.query("INSERT INTO posts (user_id, title, description, content, created_at) VALUES ($1, $2, $3, $4, $5)", [
                user_id, title, description, content, date
            ]);
            return res.status(200).json({message: "Пост успешно опубликован!"});
        }
        catch (e){
            return res.status(500).json({message: e.message})
        }
    }

    async getPosts(req, res) {
        try {
            const posts = await db.query("SELECT * FROM posts");
            return res.json(posts.rows);
        }
        catch (e) {
            return res.status(500).json({message: `${e}\nЧто-то пошло не так :(`});
        }
    }

    async getPost(req, res) {
        try {
            const postId = req.params.id;
            const post = await db.query("SELECT * FROM posts WHERE id = $1", [postId]);
            return res.status(200).json(post.rows)
        }
        catch (e) {
            return res.status(500).json({message: `${e}Что-то пошло не так :(`})
        }
    }
    async deletePost(req, res) {
        try {
            const postId = req.params.id;
            await db.query("DELETE FROM posts WHERE id= $1", [postId]);
            return res.json({"message": "Пост успешно удален"});
        }
        catch (e) {

        }
    }
}
module.exports = new PostController();