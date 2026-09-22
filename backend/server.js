
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
app.post('/api/cart', (req, res) => {
  console.log('Cart updated:', req.body.cart);
  res.status(200).json({ success: true });
});


const fs = require('fs');
const path = require('path');

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const filePath = path.join(__dirname, 'subscribers.json');
  let subscribers = [];

  if (fs.existsSync(filePath)) {
    subscribers = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  if (subscribers.includes(email)) {
    return res.status(200).json({ success: true, message: 'Already subscribed' });
  }

  subscribers.push(email);
  fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));

  console.log('New subscriber:', email);
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