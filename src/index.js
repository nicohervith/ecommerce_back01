const express = require("express");
const Stripe = require("stripe");
const morgan = require("morgan");
const cors = require("cors");
const { mongoose } = require("./database");

const stripe = new Stripe(
  "sk_test_51LAIJWIlL7CBuxtZLw6cfpiSgnSFZr6mAcf3enu3d68WecgUflMaJQIC9z0rtNyon4EAFsfhkNtM8EcQS758pg6a00G3apDEpv"
);

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/checkout", require("./routes/checkout.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

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
