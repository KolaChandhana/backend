const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.get("/", (req, res) => {
    res.send("Recipe API Running");
});
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});