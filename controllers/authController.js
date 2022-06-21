const User = require("../model/User");
const jwt = require("jsonwebtoken")
const { hashing } = require("../utils/hashing")

module.exports = {
    viewRegister: async(req, res) => {
        res.render("register.ejs")
    },
    registerAcc: async(req, res) => {
        console.log(hashing(req.body.password))
        const register_acc = new User({
            user_name: req.body.user_name,
            password: hashing(req.body.password)
        })
        console.log("reg_acc", register_acc);
        try {
            await register_acc.save()
            console.log("Account created");
            res.redirect("/")
        } catch (err) {
            console.log(err);
            console.log("Create account failed");
            res.redirect("/")
        }
    },
    viewLogin: async(req, res) => {
        res.render("login.ejs")
    },
    postLogin: async(req, res, next) => {
        const loginInfo = {
            user_name: req.body.user_name,
            password: req.body.password
        }
        console.log(loginInfo);
        const result = await User.findOne(loginInfo)
        if (!result) return res.redirect("/login")
        const dataToken = {
            _id: result._id,
            user_name: result.user_name,
        }

        const token = await jwt.sign(dataToken, process.env.JWT_SECRET_KEY)
        console.log(token);
        // res.locals.token = token
        res.cookie("token", token)
        next()
        return res.redirect("/")
    }
}