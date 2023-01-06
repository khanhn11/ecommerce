const User = require("../models/User");
const router = require("express").Router();

router.get("/:id/:token", async (req, res) => {
  const token = req.params.token;
  console.log(token);

  try {
    const user = await User.findOne({
      _id: req.params.id,
      token: req.params.token,
    });
    !user && res.status(400).send("Invalid link");
    await User.updateOne({ _id: user._id, confirmed: true });

    console.log("User email is verified >>");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
