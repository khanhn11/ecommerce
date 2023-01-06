const User = require("../models/User");
const { verifyToken } = require("../routes/verifyToken");

const confirmEmail = (req, res, next) => {
  verifyToken(req, res, () => {
    const user = User.findOne({
      _id: req.params.id,
    });

    console.log(user);

    if (!user.confirmed) {
      user.confirmed = true;
      try {
        // save new user
        const savedUser = user.save();
        res.status(201).json(savedUser);
        console.log(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  });
};

module.exports = confirmEmail;
