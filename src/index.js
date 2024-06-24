const express = require("express");
const Stripe = require("stripe");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { mongoose } = require("./database");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/checkout", require("./routes/checkout.routes"));

app.post("/api/checkout", async (req, res) => {
  console.log("Request body:", req.body); 

  const { id, amount, products } = req.body;

  try {
    products.forEach((product) => {
      if (!product.name || !product.price) {
        throw new Error(
          "Product validation failed: name and price are required"
        );
      }
    });

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
    console.error(error); // Verificar cualquier error
    return res.status(400).json({ message: error.message });
  }
});


app.listen(4000, () => console.log("Server listening on port", 4000));
