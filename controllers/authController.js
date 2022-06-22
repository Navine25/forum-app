const User = require("../model/User");
const jwt = require("jsonwebtoken")
const { hashing } = require("../utils/hashing")
const bcrypt = require('bcryptjs');

module.exports = {
    viewRegister: async(req, res) => {
        res.render("register.ejs", { logToken: req.cookies })
    },
    registerAcc: async(req, res) => {
        // Hashing using callback
        // hashing(req.body.password, (hash) => {
        //     console.log("hashing", hash)
        // })
        const register_acc = new User({
            user_name: req.body.user_name,
            password: bcrypt.hashSync(req.body.password, 4) // semoga bisa
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
        res.render("login.ejs", { logToken: req.cookies })
    },
    postLogin: async(req, res, next) => {
        const loginInfo = {
            user_name: req.body.user_name,
            password: req.body.password
        }
        console.log(loginInfo);
        const result = await User.findOne({ user_name: loginInfo.user_name })
        if (!result) return res.redirect("/login")
        const checkPass = bcrypt.compareSync(loginInfo.password, result.password);
        if (!checkPass) return res.redirect("/login")
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
    },
    logout: async() => {
        console.log(document.cookie)
    }
}