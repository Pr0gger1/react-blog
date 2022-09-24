const express = require("express");
const config = require("config");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/posts.routes")


const app = express();
app.use(express.json({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter)
app.use("/api/users", userRouter);


const PORT = config.get("port");

app.listen(PORT, () => {
    console.log(`App has been started on ${PORT} port`)
})
