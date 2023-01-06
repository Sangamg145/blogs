const router = require("express").Router();
const Post = require("../models/post");
const { upload } = require("./upload");
const { verifyToken } = require("./verifyToken");

router.post(
  "/create-post",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const newUser = new Post({
        title: req.body.title,
        category: req.body.category,
        post: req.body.post,
        image: req.file ? req.file.filename : null,
      });
      const saveUser = await newUser.save();
      res.status(201).json({"success":"true","status_code":200,"message":"Ok",data:saveUser});
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.put(
  "/post/:id",
  verifyToken,
  async (req, res) => {
    try {
      const data = {
        title: req.body.title,
        post: req.body.post,
        image: req.file ? req.file.filename : null,
      };
      const updatePost = await Post.findByIdAndUpdate(req.params.id,
        { $set: data},
        {new:true}
      )
      res.status(200).json({"success":"true","status_code":200,"message":"Ok",data:updatePost});
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
router.delete(
  "/post/:id",
  verifyToken,
  async (req, res) => {
    try {
      const deletePost = await Post.findByIdAndDelete(req.params.id)
      res.status(200).json({"success":"true","status_code":200,"message":"Post deleted successfullys",});
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/post", verifyToken, async (req, res) => {
  try {
    const post = await  Post.find({category:req.query.cat});
    const post1 = await  Post.find();
    res.status(200).json({"success":"true","status_code":200,"message":"Ok",data:req.query.cat?post:post1});
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/post/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({"success":"true","status_code":200,"message":"Ok",data:post});
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
