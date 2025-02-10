require("dotenv").config();
const sequelize = require("./config/database");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const formRoutes = require("./routes/formRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL!");

    await sequelize.sync({ alter: true }); // Set `{ force: true }` to drop and recreate tables
    console.log("✅ Database synced successfully!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
})();

app.use("/api/forms", formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
