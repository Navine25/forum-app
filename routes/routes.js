const router = require("express").Router()
const jwt = require("jsonwebtoken")
const homeController = require("../controllers/homeController")
const authController = require("../controllers/authController")
const { isLogin, isNotLogin} = require("../controllers/middleware")
const verifyMail = require("../utils/verifyMail")


router.get("/", homeController.viewHome)
router.post("/", isLogin, homeController.postContent)
router.post("/comment/:id", isLogin, homeController.postComment)
router.get("/register", authController.viewRegister)
router.post("/register", authController.registerAcc)
router.get("/login", authController.viewLogin)
router.post("/login", authController.postLogin)
router.get("/logout", authController.logout)
router.get("/like/:id/:action", isLogin, homeController.like)
router.get("/verifyEmail/:token", authController.verifyEmail)

module.exports = router