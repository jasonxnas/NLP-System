const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const BACKEND_PORT = process.env.PORT || 3000; // Render dynamically assigns a port

app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests

app.use(routes); // Use the routes defined in backend/routes/index.js

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Start server
app.listen(BACKEND_PORT, () => {
  console.log(`Express Server running on port ${BACKEND_PORT}`);
});
