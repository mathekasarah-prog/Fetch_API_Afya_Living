const productContainer = document.querySelector("#product-container");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");

async function getProducts() {
    try {
       
        loadingMessage.textContent = "Loading products...";
        errorMessage.textContent = "";

        const response = await fetch(
            "http://localhost:3000/api/products"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const products = await response.json();


         products.forEach((product) => {
             productContainer.innerHTML += `
                <article class="product-card">
                    <img src = "${product.image}" alt = "${product.name}" class="product-image">
                    <div class="product-info">
                    <p class="product-category">Category: ${product.category}</p>
                    <h3 class = "product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class= "product-price">KSh ${product.price.toLocaleString()}</p>
                    <button type="button" class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </article>
            `;
         })

        loadingMessage.textContent = "";

    } catch (error) {

        loadingMessage.textContent = "";
        errorMessage.textContent =
            "Sorry, we could not load our products.";

        console.error("Product loading failed:", error);
    }
}

getProducts();