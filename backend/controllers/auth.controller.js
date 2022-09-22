const db = require("../db");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

class AuthController {
    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    success: false
                })
            }

            const {email, password} = req.body;
            const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            console.log(user)

            if (user.rowCount) {
                const isPasswordRight = await bcrypt.compare(password, user.rows[0].password);

                if (!isPasswordRight) {
                    return res.status(400).json({
                        success: false,
                        errors: [
                            {value: password, param: "password", msg: "Неверный пароль"}
                        ]
                    })
                }
                else {
                    const token = jwt.sign(
                        {userId: user.rows[0].id},
                        config.get("jwtSecret"),
                        {expiresIn: "1h"}
                    );
                    res.json({
                        token,
                        userId: user.rows[0].id,
                        username: user.rows[0].username,
                        email: user.rows[0].email,
                        success: true
                    })
                }
            }
            else {
                return res.status(404).json({
                    success: false,
                    errors: [
                        {value: email, param: "email", msg: "Пользователь не существует"}
                    ]
                })
            }
        }
        catch (e) {
            res.status(500).json({message: `Ошибка 500 ${e}`})
        }
    }

    async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                success: false
            })
        }

        const {username, email, password} = req.body;
        const isEmailExist = await db.query("SELECT email FROM users WHERE email = $1", [email]);

        if (isEmailExist.rowCount) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        value: email,
                        param: "email",
                        msg: "Пользователь с таким email уже существует"
                    }
                ]
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [
            username, email, hashedPassword
        ]);
        return res.status(201).json({ message: "Вы успешно зарегистрировались!" });
    }
}

module.exports = new AuthController();