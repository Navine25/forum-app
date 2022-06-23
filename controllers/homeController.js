const forumApp = require("../model/Forum");
const comment = require("../model/Comment")
const { decode } = require("../utils/decode");
const { find } = require("../model/Forum");

module.exports = {
  viewHome: async (req, res) => {
    const dataUser = await decode(req.cookies.token);
    const posta = await forumApp.find({}).populate('user').populate('comment')
    // console.log("isi post", posta[0].comment)
    console.log("token udh login", req.cookies);
    // console.log(dataUser)

    // console.log(posta[0].content)
    res.render("home.ejs", { logToken: dataUser ? dataUser.user_name : null , postingan: posta});
  },
  postContent: async (req, res) => {
    console.log(req.user)
    const forumPost = new forumApp({
      content: req.body.content,
      user: req.user._id
    });

    try {
      await forumPost.save();
      res.redirect("/");
    } catch (err) {
      console.log("Failed to post");
      res.redirect("/");
    }
  },
  postComment: async (req, res) =>{
    // console.log(req.params)
      const replyPost = new comment({
        content: req.body.reply,
        postId: req.params.id,
        user: req.user._id
      })
      try {
        await replyPost.save()
        const findPost = await forumApp.findById(req.params.id)
        findPost.comment.push(replyPost)
        console.log(replyPost)
        await findPost.save()
        res.redirect("/")
      } catch (error) {
            console.log("Failed to comment");
      }
  },
  like: async(req,res) => {
    const postId = req.params.id
    const post =  await forumApp.findById(postId)
    if(req.params.action == "up") post.likeUp = post.likeUp +1;
    if(req.params.action == "down") post.likeDown = post.likeDown +1;
    await post.save()
    res.redirect("/")
    // console.log(postId)
  }
};
