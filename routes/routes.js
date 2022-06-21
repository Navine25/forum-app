const router = require("express").Router()
const jwt = require("jsonwebtoken")
const homeController = require("../controllers/homeController")
const authController = require("../controllers/authController")
const { isLogin, isNotLogin } = require("../controllers/middleware")


router.get("/", homeController.viewHome)
router.post("/", isLogin, homeController.postContent)
router.get("/register", authController.viewRegister)
router.post("/register", authController.registerAcc)
router.get("/login", authController.viewLogin)
router.post("/login", authController.postLogin)

module.exports = router