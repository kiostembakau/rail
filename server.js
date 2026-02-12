const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "data.json";

let data = {};
if (fs.existsSync(FILE)) {
  data = JSON.parse(fs.readFileSync(FILE));
}

function generateUsername() {
  const adj = ["Blue","Red","Sunny","Crazy","Happy","Swift","Magic"];
  const animal = ["Tiger","Fox","Panda","Wolf","Cat","Lion","Bear"];
  return adj[Math.floor(Math.random()*adj.length)] +
         animal[Math.floor(Math.random()*animal.length)] +
         Math.floor(Math.random()*1000);
}

app.post("/get-username", (req, res) => {
  const fingerprint = req.body.fingerprint;
  if (!fingerprint) return res.status(400).json({ error: "No fingerprint" });

  if (!data[fingerprint]) {
    data[fingerprint] = generateUsername();
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  }

  res.json({ username: data[fingerprint] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
