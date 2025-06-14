const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./Config/DB.js");
const userRoutes = require("./Routes/userRoutes.js");
const productRoutes = require("./Routes/productRoutes.js");
const cartRoutes = require("./Routes/cartRoutes.js");
const checkoutRoutes = require("./Routes/checkoutRoutes.js");
const orderRoutes = require("./Routes/orderRoutes.js");
const uploadRoutes = require("./Routes/uploadRoutes.js");
const subscriberRoute = require("./Routes/subscribeRoute.js");
const adminRoutes = require("./Routes/adminRoutes.js");
const ProductAdminRoutes = require("./Routes/productAdminRoutes.js");
const adminOrderRoutes = require("./Routes/adminOrderRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;
//  now i am going to connect to the mongo database
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO RABBIT API!");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscriberRoute);
app.use("/api/admin/products", ProductAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/users", adminRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})

