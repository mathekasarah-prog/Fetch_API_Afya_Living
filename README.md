# Afya Living 🌿

A responsive e-commerce platform for natural wellness and self-care products, inspired by African wellness traditions. Built as a full-stack project featuring dynamic product rendering, cart management, user authentication, and order checkout.

*Live demo:* http://127.0.0.1:5501 (via Live Server)
*Backend:* http://localhost:3000

---<img width="640" height="764" alt="Screenshot 2026-09-24 234410" src="https://github.com/user-attachments/assets/d5253288-5180-4866-b4c3-8208f3ee6db9" />


## 📖 About

Afya Living is a fictional online shop selling skincare, hair care, and wellness products (body oils, butters, soaps, candles, bath sets). The project demonstrates a complete shopping flow — from browsing products through account creation to placing an order — using vanilla JavaScript and jQuery on the frontend, with a lightweight Node.js/Express backend.

---<img width="640" height="764" alt="Screenshot 2026-09-24 234559" src="https://github.com/user-attachments/assets/2a90ccf9-8bc2-4979-8565-7aeddd8759e0" />


## ✨ Features

- *Product catalog* — dynamically fetched from a backend API and rendered on the page
- *Search* — filter products by name or description as you type
- *Category filter* — narrow products by category (Skin Care, Hair Care, Wellness)
- *Sorting* — sort by price (low → high, high → low) or by rating
- *Product detail modal* — view full details, rating, and reviews for any product
- *Quantity selector* — adjust quantity per product before adding to cart
- *Shopping cart*
  - Add, remove, and adjust quantities of items
  - Live-updating subtotal and total
  - Persists across page reloads via localStorage
- *User accounts*
  - Sign up and log in with hashed passwords (bcrypt)
  - Checkout is gated behind login — guests are prompted to create an account or sign in
- *Checkout*
  - Order summary with itemized pricing
  - Choice of delivery method (home delivery or store pickup)
  - Delivery address required only for home delivery
  - Toast-style success confirmation, no jarring browser alerts
- *Newsletter subscription* — collects and stores subscriber emails
- *Contact form* — sends messages to the backend for follow-up
- *Order storage* — completed orders are saved server-side with customer and cart details

---<img width="640" height="764" alt="Screenshot 2026-09-24 234658" src="https://github.com/user-attachments/assets/6ac09cb0-76d3-46be-a2a8-c6b418935711" />


## 🛠️ Tech Stack

*Frontend*
- HTML5, CSS3
- JavaScript (ES6+)
- jQuery

*Backend*
- Node.js
- Express.js
- bcrypt (password hashing)
- CORS

*Data storage*
- JSON files (products.js, orders.json, users.json, subscribers.json) — no external database required

---

## 📁 Project Structure


Fetch_API_Afya_Living/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Images/
│       └── (product images)
└── backend/
    ├── server.js
    ├── products.js
    ├── orders.json
    ├── users.json
    └── subscribers.json


---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A code editor (e.g. VS Code) with a live server extension (e.g. Live Server)

### 1. Clone the repository
bash
git clone <your-repo-url>
cd Fetch_API_Afya_Living


### 2. Set up the backend
bash
cd backend
npm install
node server.js

The server will start on http://localhost:3000.

### 3. Set up the frontend
Open frontend/index.html with Live Server (or any static file server). By default it runs on http://127.0.0.1:5501.

> *Note:* The frontend expects the backend to be running on http://localhost:3000. Make sure both are running simultaneously.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /api/products | Returns the full product catalog |
| POST | /api/signup | Creates a new user account |
| POST | /api/login | Authenticates an existing user |
| POST | /api/cart | Logs/stores the current cart state |
| POST | /api/orders | Submits a completed order |
| POST | /api/subscribe | Adds an email to the newsletter list |
| POST | /api/contact | Submits a contact form message |

---

## 🖥️ Usage Walkthrough

1. Browse products on the shop page — filter, sort, or search as needed
2. Click *View Details* to see a product's full description and rating
3. Adjust quantity and click 3. *Add to Cart*
4. Click the *Cart* button in the nav to review your items
5. Click *Checkout* — if not logged in, you'll be prompted to sign up or log in
6. Fill in your name, phone number, delivery method, and address (if applicable)
7. Submit the order and receive a confirmation message

---

## 🔮 Future Improvements

- Persist login sessions with JWT instead of client-side localStorage
- Move from JSON file storage to a proper database (MongoDB/PostgreSQL)
- Add an admin dashboard for managing products and viewing orders
- Add order history for logged-in users
- Integrate real payment processing (e.g. M-Pesa, Stripe)
- Add product image zoom and multiple product images per item

---

## 👩‍💻 Author

*Sarah Matheka*
Built as part of a full-stack software engineering bootcamp.

---

## 📄 License

This project is licensed under the MIT License.
