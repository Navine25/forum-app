const router = require("express").Router()
const homeController = require("../controllers/homeController")

router.get("/", homeController.viewHome)
router.post("/", homeController.postContent)

module.exports = router