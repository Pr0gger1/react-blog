const Router = require("express");
const router = new Router();
const postController = require("../controllers/post.controller")

router.post("/add", postController.createPost);
router.get("/get/all", postController.getPosts);
router.get("/get/:id", postController.getPost);
router.delete("/get/:id", postController.deletePost);

module.exports = router;