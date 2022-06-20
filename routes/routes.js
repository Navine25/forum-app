const router = require("express").Router()
const jwt = require("jsonwebtoken")
const homeController = require("../controllers/homeController")
const authController = require("../controllers/authController")



router.get("/", (req, res, next) => {
        jwt.sign({ foo: 'bar' }, process.env.JWT_SECRET_KEY, function(err, token) {
            res.locals.token = token
            console.log(token);
            next();
        })
    },
    homeController.viewHome)
router.post("/", homeController.postContent)
router.get("/register", authController.registerAcc)

module.exports = router