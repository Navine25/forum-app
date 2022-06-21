const jwt = require("jsonwebtoken")
const User = require("../model/User");

module.exports = {
    isLogin: async(req, res, next) => {
        try {
            const token = req.cookies.token
            if (!token) res.redirect("/login")
            const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const user = await User.findById(data._id)
            if (!user) res.redirect("/login")
            req.user = user
            req.token = token
            next()
        } catch (error) {
            console.log(error);
        }
    },
    isNotLogin: async(req, res, next) => {
        try {
            const token = req.cookies.token
            if (token) res.redirect("/")
        } catch (error) {
            console.log(error);
        }
    }
}