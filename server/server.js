const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/todo");
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    return res.status(400).json({ message: "Username already taken" });
  }

  await User.create({ username: username, password: password });
  res.send({ message: "success" });
});

app.get("/", (req, res) => {
  res.send("Backend");
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
