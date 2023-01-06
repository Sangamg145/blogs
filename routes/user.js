const router = require("express").Router();
const User = require("../models/user");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./verifyToken");

router.post("/register", async (req, res) => {
  try {
    const email = await User.findOne({ email: req.body.email });
    email && res.status(200).json("User already exists");
    const newUser = new User({
      name: req.body.username,
      password: cryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_KEY
      ).toString(),
      email: req.body.email,
    });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.username });
    !user && res.status(401).json("Wrong username!");
    const hashedpassword = cryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_KEY
    );
    const pass = hashedpassword.toString(cryptoJS.enc.Utf8);
    pass !== req.body.password && res.status(401).json("Wrong password!");
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/user", verifyToken, async (req, res) => {
  const authHeader=req.headers.token;
  if(authHeader){
    const token = authHeader.split(" ")[1]
    const id = jwt.verify(token, process.env.JWT_KEY);
  try {
    const user = await User.find({_id:id.id});
    const { password, ...others } = user[0]._doc;
    res.status(200).json({"success":"true","status_code":200,"message":"Ok",data:others});
  } catch (error) {
    res.status(500).json(error);
  }
}
});
module.exports = router;
