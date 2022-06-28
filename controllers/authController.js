const User = require("../model/User");
const jwt = require("jsonwebtoken")
const { hashing } = require("../utils/hashing")
const bcrypt = require('bcryptjs');
const {decode} = require("../utils/decode")
const {sendVerifyEmail} = require("../utils/verifyMail")
const flash = require("express-flash")

module.exports = {
    viewRegister: async(req, res) => {
        const dataUser = await decode(req.cookies.token);
        res.render("register.ejs", { logToken: dataUser ? dataUser.user_name : null })
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
       
        // console.log("reg_acc", register_acc);
        try {
            await register_acc.save()
            // const newAcc_id = register_acc._id.toString()
            await sendVerifyEmail(register_acc)
            console.log("Account created");

            res.redirect("/")
        } catch (err) {
            console.log(err);
            console.log("Create account failed");
            res.redirect("/")
        }
    },
    viewLogin: async(req, res) => {
        const dataUser = await decode(req.cookies.token);
        res.render("login.ejs", { logToken: dataUser ? dataUser.user_name : null , msg:req.query.msg})
    },
    postLogin: async(req, res, next) => {
        const loginInfo = {
            user_name: req.body.user_name,
            password: req.body.password
        }
        console.log(loginInfo);
        const result = await User.findOne({ user_name: loginInfo.user_name })
        var errorMsgUserNotFound = encodeURIComponent("User Not Found")
        if (!result) return res.redirect(`/login?msg=${errorMsgUserNotFound}`)
        // if (!result) return res.render("login.ejs", {logToken: null, msg:'user not found'})
        const checkPass = bcrypt.compareSync(loginInfo.password, result.password);
        if (!checkPass) return res.redirect("/login")
        var errorMsgUserNotVerified = encodeURIComponent("User Not Verified")
        if(result.isVerify == false) {
            // req.flash('msg', 'account not verified')
            return res.redirect(`/login?msg=${errorMsgUserNotVerified}`)
        }
        const dataToken = {
            _id: result._id,
            user_name: result.user_name,
        }
        const token = await jwt.sign(dataToken, process.env.JWT_SECRET_KEY)
        console.log(token);
        // res.locals.token = token
        res.cookie("token", token)
        next()
        return res.redirect('/')
    },
    logout: async(req, res) => {
        // console.log(req.cookie)
        delete req.cookies
        res.clearCookie("token")
        res.redirect("/")
    },
    verifyEmail: async(req, res, next)=>{
        if(req.params.token == null){
            console.log("Error bro")
            return res.redirect("/")
        }
        const data = jwt.verify(req.params.token, process.env.JWT_SECRET_KEY)
        console.log("req peram: ", req.params.token)
        console.log("data: ", data)
        const userId = await User.findById(data._id)
        if(!userId) {
            console.log("user nor found")
            res.redirect("/")
        }
        userId.isVerify = true
        await userId.save()
        // alert("verify selesai")
        console.log("verify selesai")
        res.redirect("/")
    }
}