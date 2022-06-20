const userModel = require("../model/User")

module.exports = {
    registerAcc: async(req, res) => {
        // console.log(req.body.username);
        res.render("register.ejs")
    }
}