const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products");

dotenv.config();
connectDB();

const importProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Products Imported");
    process.exit();
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
};

importProducts();