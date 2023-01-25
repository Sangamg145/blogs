const router = require("express").Router();
const User = require("../models/user");
const nodemailer = require('nodemailer');

router.post("/contact-us", async (req, res) => {
  try {
    // const email = await User.findOne({ email: req.body.email });
    // email && res.status(200).json("User already exists");
    // const newUser = new User({
    //   name: req.body.username,
    //   password: cryptoJS.AES.encrypt(
    //     req.body.password,
    //     process.env.PASS_KEY
    //   ).toString(),
    //   email: req.body.email,
    // });
    // const saveUser = await newUser.save();
    // res.status(201).json(saveUser);


let mailTransporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
    port:587,
    requireTLS:'true',
    secure:false,
	auth: {
		user: 'datandler1@gmail.com',
		pass: 'pjtnvsbxapjxdspm'
	}
});

let mailDetails = {
	from: 'datandler1@gmail.com',
	to: req.body.email,
	subject: 'Datandler Software',
	text: req.body.message,
};

mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {
		res.status(500).json(err);
        console.log('error',err);
	} else {
		console.log('Email sent successfully');
        res.status(200).json(data)
	}
});

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
