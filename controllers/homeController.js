module.exports = {
    viewHome: async(req, res) => {
        res.render("home.ejs")
    },
    postContent: async(req, res) => {
        console.log(req.body)
        const content = req.body.content
        console.log(content);
    }
}