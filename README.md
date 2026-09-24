# 🌿 Afya Living — Natural Wellness & Self-Care E-Commerce Website

> **Afya Living** is a responsive full-stack e-commerce web application for showcasing and purchasing natural beauty, wellness, and self-care products inspired by nature and African wellness traditions.

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Project Objectives](#-project-objectives)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [How the Application Works](#-how-the-application-works)
- [Frontend](#-frontend)
- [Backend](#-backend)
- [API Endpoints](#-api-endpoints)
- [Product Data](#-product-data)
- [Shopping Cart](#-shopping-cart)
- [Search, Filtering and Sorting](#-search-filtering-and-sorting)
- [User Authentication](#-user-authentication)
- [Checkout and Orders](#-checkout-and-orders)
- [Newsletter Subscription](#-newsletter-subscription)
- [Contact Form](#-contact-form)
- [Data Storage](#-data-storage)
- [Responsive Design](#-responsive-design)
- [Accessibility](#-accessibility)
- [Installation and Setup](#-installation-and-setup)
- [Running the Project](#-running-the-project)
- [Screenshots](#-screenshots)
- [Testing](#-testing)
- [Future Improvements](#-future-improvements)
- [Learning Outcomes](#-learning-outcomes)
- [Author](#-author)
- [License](#-license)

---

# 🌱 About the Project

Afya Living is a natural wellness and self-care e-commerce website designed to provide customers with a simple and engaging online shopping experience.

The website showcases products such as:

- Natural skincare products
- Hair-care products
- Wellness products
- Gift sets

The project started as a frontend product showcase and was expanded into a more interactive full-stack application using JavaScript, jQuery, AJAX, Fetch API, Node.js and Express.

The application allows users to browse products, search for products, filter products by category, sort products, view product details, add products to a shopping cart, create an account, log in, subscribe to a newsletter, submit contact messages and place orders.

---

# 🎯 Project Objectives

The main objectives of the Afya Living project were to:

- Build a responsive e-commerce website.
- Practice semantic HTML and CSS.
- Use JavaScript to add interactivity.
- Connect a frontend application to a backend API.
- Learn how REST-style API communication works.
- Practice AJAX and the Fetch API.
- Work with JSON data.
- Implement product search, filtering and sorting.
- Create an interactive shopping cart.
- Use browser `localStorage`.
- Build user registration and login functionality.
- Practice password hashing with bcrypt.
- Create backend API endpoints using Express.
- Store application data using JSON files.
- Practice asynchronous JavaScript.
- Build a complete frontend-to-backend workflow.

---

# ✨ Features

## 🛍️ Product Showcase

The website displays a collection of wellness and self-care products.

Each product includes:

- Product image
- Product name
- Category
- Price
- Rating
- Number of reviews
- Product description
- Optional badge such as `Bestseller` or `New`
- Add to Cart functionality
- View Details functionality

---

## 🔎 Product Search

Users can search for products using the search input.

The search functionality checks product information and dynamically updates the displayed products.

For example, searching for:

```text
Baobab
can display:Baobab Body Oil
The search is case-insensitive.

##Category Filtering

Users can filter products by category.

Available categories include:

Skin Care
Hair Care
Wellness
Gift Sets

The filtering functionality uses JavaScript's .filter() method to create a new list containing only products that match the selected category.

##↕️ Product Sorting

Users can sort products according to different criteria, including:

Price: Low to High
Price: High to Low
Rating

JavaScript's .sort() method is used to rearrange the product list dynamically.


