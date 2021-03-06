const forumApp = require("../model/Forum");
const comment = require("../model/Comment");
const { decode } = require("../utils/decode");
const user = require("../model/User");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { rootPath } = require("../config/index");

module.exports = {
  viewHome: async (req, res) => {
    const dataUser = await decode(req.cookies.token);
    const posta = await forumApp.find({}).populate("user").populate("comment");
    // console.log("isi post", posta[0].comment)
    console.log("token udh login", req.cookies);
    // console.log(dataUser)

    // console.log(posta[0].content)
    res.render("home.ejs", {
      logToken: dataUser ? dataUser.user_name : null,
      postingan: posta,
    });
  },
  postContent: async (req, res) => {
    // console.log(req.files)
    // console.log(../__dirname)
    // console.log("reqfile ", req.files)

    if (req.files.length) {
      console.log("rootpath ", rootPath);
      const filename = req.files[0].originalname;
      const destPath = `${rootPath}/public/images/${filename}`;
      console.log(destPath);
      const readStream = fs.createReadStream(req.files[0].path);
      const destinationStream = fs.createWriteStream(destPath);
      readStream.pipe(destinationStream);
      readStream.on("end", async () => {
        const forumPost = new forumApp({
          content: req.body.content,
          user: req.user._id,
          image: filename,
        });
        console.log("forumPost: ", forumPost);
        try {
          await forumPost.save();
          res.redirect("/");
        } catch (err) {
          console.log("Failed to post");
          res.redirect("/");
        }
      });
    } else {
      const forumPost = new forumApp({
        content: req.body.content,
        user: req.user._id,
        image: null,
      });
      console.log("forumPost: ", forumPost);
      try {
        await forumPost.save();
        res.redirect("/");
      } catch (err) {
        console.log("Failed to post");
        res.redirect("/");
      }
    }

  },
  postComment: async (req, res) => {
    // console.log(req.params)
    const replyPost = new comment({
      content: req.body.reply,
      postId: req.params.id,
      user: req.user._id,
    });
    try {
      await replyPost.save();
      const findPost = await forumApp.findById(req.params.id);
      findPost.comment.push(replyPost);
      console.log(replyPost);
      await findPost.save();
      res.redirect("/");
    } catch (error) {
      console.log("Failed to comment");
    }
  },
  like: async (req, res) => {
    const postId = req.params.id;
    const post = await forumApp.findById(postId);
    const userId = req.user._id;
    const userData = await user.findById(userId);
    let isLiked = false;

    if (userData.likedPost != null) {
      for (let index = 0; index < userData.likedPost.length; index++) {
        if (post._id.toString() == userData.likedPost[index]._id.toString()) {
          isLiked = true;
          console.log("isliked", isLiked);
        }
      }
    }

    if (isLiked == false) {
      if (req.params.action == "up") post.likeUp = post.likeUp + 1;
      if (req.params.action == "down") post.likeDown = post.likeDown + 1;
      userData.likedPost.push(postId);
      await userData.save();
    } else {
      console.log("Post have been liked.");
    }

    await post.save();
    res.redirect("/");
  },
};
