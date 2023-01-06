const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("../config/nodemailer.config");

// REGISTER NEW USERS
router.post("/register", async (req, res) => {
  // generate email token
  const accessToken = jwt.sign(
    {
      id: req.body.id,
      isAdmin: req.body.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: "3d" }
  );

  // create new user user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    confirmationCode: accessToken,
  });

  try {
    // save new user
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log("User is registered >>");
  } catch (err) {
    res.status(500).json(err);
  }

  // send confirmation email to user
  sendConfirmationEmail(
    newUser.username,
    newUser.email,
    newUser.id,
    newUser.confirmationCode
  );
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    // response if there is no user
    !user && res.status(401).json("Wrong Credentials!");

    // response if user is not confirmed
    !user.confirmed &&
      res.status(401).json("Please confirm your email to login");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    // compare password
    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong Credentials!");

    // access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
    console.log("User is logged in successfully >>");
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGOUT
router.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else {
        res.send('Logout successful')
        console.log("User is logged out successfully >>");
      }
    });
  } else {
    res.end()
  }
})


module.exports = router;
