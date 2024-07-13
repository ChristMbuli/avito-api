const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const URI = process.env.MONGODB_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

// MongoDB Schema and Model
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  fullname: String,
  email: String,
  message: String,
});

const Message = mongoose.model("Message", messageSchema);

// Routes
app.post("/api/messages", (req, res) => {
  const { fullname, email, message } = req.body;

  const newMessage = new Message({ fullname, email, message });

  newMessage
    .save()
    .then(() => res.json("Message sent!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
