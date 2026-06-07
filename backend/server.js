const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const healthRoutes = require("./routes/healthRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes.js');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cart', cartRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});