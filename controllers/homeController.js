const forumApp = require("../model/Forum")
const { decode } = require("../utils/decode")

module.exports = {
    viewHome: async(req, res) => {
        const dataUser = await decode(req.cookies.token)
        console.log("token udh login", req.cookies)
        res.render("home.ejs", { logToken: dataUser.user_name })
    },
    postContent: async(req, res) => {
        const forumPost = new forumApp({
            content: req.body.content
        })

        try {
            await forumPost.save()
            res.redirect("/")
        } catch (err) {
            console.log("Failed to post");
            res.redirect("/")
        }


    }
}