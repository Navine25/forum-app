const forumApp = require("../model/Forum")

module.exports = {
    viewHome: async(req, res) => {
        console.log(res.locals.token)
        res.render("home.ejs")
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