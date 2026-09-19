
const express = require("express");

const products = require("./products");

const cors = require("cors");

const app = express();

const PORT = 3000;
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
    response.send("Welcome to the Afya Living backend!");
});

app.get("/api/products", (request, response) => {
    response.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});