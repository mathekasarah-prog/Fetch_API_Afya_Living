
const express = require("express");

const products = require("./products");

const cors = require("cors");

const app = express();

const PORT = 3000;
app.use(cors());

// Allow the server to understand JSON sent by clients
app.use(express.json());

// Home route
app.get("/", (request, response) => {
    response.send("Welcome to the Afya Living backend!");
});

// Products API route
app.get("/api/products", (request, response) => {
    response.json(products);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});