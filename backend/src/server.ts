import express from 'express';

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Amal Transfers backend!");
});

app.listen(5001, () => {
  console.log("✅ Backend running at http://localhost:5001");
});