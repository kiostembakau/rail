const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "data.json";

// Load file data.json atau buat baru
let data = {};
if (fs.existsSync(FILE)) {
  data = JSON.parse(fs.readFileSync(FILE));
}

// Generate username random
function generateUsername() {
  const adj = ["Blue","Red","Sunny","Crazy","Happy","Swift","Magic"];
  const animal = ["Tiger","Fox","Panda","Wolf","Cat","Lion","Bear"];
  return adj[Math.floor(Math.random()*adj.length)] +
         animal[Math.floor(Math.random()*animal.length)] +
         Math.floor(Math.random()*1000);
}

// Endpoint untuk username per device
app.post("/get-username", (req, res) => {
  const deviceId = req.body.fingerprint;
  if (!deviceId) return res.status(400).json({ error: "No device ID" });

  if (!data[deviceId]) {
    data[deviceId] = generateUsername();
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  }

  res.json({ username: data[deviceId] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
