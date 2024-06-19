const express = require("express");
const Stripe = require("stripe");
const morgan = require("morgan");
const cors = require("cors");
const { mongoose } = require("./database");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/checkout", require("./routes/checkout.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));

app.post("/api/checkout", async (req, res) => {
  console.log(req.body);
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Basket of products",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    return res.status(200).json({ message: "Successful payment" });
  } catch (error) {
    return res.status(400).json({ message: error.raw.message });
  }
});

app.listen(4000, () => console.log("Server listening on port", 4000));
