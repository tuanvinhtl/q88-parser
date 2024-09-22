const express = require("express");
const app = express();
require("dotenv").config();
const { sequelize } = require("./models");

const fileRoutes = require("./routes/file.routes");
const vesselRoutes = require("./routes/vessel.routes");
const uploadRoutes = require("./routes/upload");

// Middleware for parsing JSON
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/files", fileRoutes);
app.use("/api/vessels", vesselRoutes);
app.use("/upload", uploadRoutes);

// Sync DB and start server
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
  });
});
