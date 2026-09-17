
async function getProducts() {
    const response = await fetch("http://localhost:3000/api/products");

    const products = await response.json();

    console.log(products);
}

getProducts();


const productContainer = document.querySelector("#product-container");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");

async function getProducts() {
    try {
        // 1. Tell the user we are loading products
        loadingMessage.textContent = "Loading products...";
        errorMessage.textContent = "";

        // 2. Ask the backend for products
        const response = await fetch(
            "http://localhost:3000/api/products"
        );

        // 3. Check if the server responded successfully
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        // 4. Convert the response into JavaScript data
        const products = await response.json();

        // 5. Clear the loading message
        loadingMessage.textContent = "";

        // 6. Display the products on the page
        products.forEach((product) => {
            productContainer.innerHTML += `
                <article class="product-card">
                    <img src = "${product.image}" class="product-image">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Category: ${product.category}</p>
                    <p>KSh ${product.price.toLocaleString()}</p>
                    <button type="button">Add to Cart</button>
                </article>
            `;
        });

    } catch (error) {
        // 7. Show a message if something goes wrong
        loadingMessage.textContent = "";
        errorMessage.textContent =
            "Sorry, we could not load our products.";

        console.error("Product loading failed:", error);
    }
}

// 8. Start the process
getProducts();