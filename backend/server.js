
const express = require("express");

const products = require("./products");

const cors = require("cors");

const app = express();

const PORT = 3000;
app.use(cors());
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  console.log('New contact message:', { name, email, message });
  // TODO: save to a file/db, or send an email, if you want persistence
  res.status(200).json({ success: true });
});

app.get("/", (request, response) => {
    response.send("Welcome to the Afya Living backend!");
});

app.get("/api/products", (request, response) => {
    response.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});