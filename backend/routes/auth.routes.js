const Router = require("express");
const router = new Router();
const authController = require("../controllers/auth.controller");
const {check} = require("express-validator");


router.post(
    "/register", [
        check("email", "Некорректный email").isEmail(),
        check("password", "Минимальная длина пароля - 6 символов").isLength({min: 6})
    ],
    authController.register);

router.post("/login", [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля - 6 символов").isLength({min: 6})
    ],
    authController.login);


module.exports = router;