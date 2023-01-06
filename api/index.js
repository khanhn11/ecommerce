const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const User = require("./models/User");
const cors = require("cors");
dotenv.config();

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull >>"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);

// verify user email
app.get("/verify/:id/:token", async (req, res) => {

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

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

const PORT = process.env.PORT || 4000
app.listen(PORT || 4000, () => {
  console.log(`Server is running on Port >> ${PORT}`);
});
