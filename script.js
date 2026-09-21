const productContainer =
    document.querySelector("#product-container");

const categoryFilter =
    document.querySelector("#category-filter");

const sortProducts =
    document.querySelector("#sort-products");

const loadingMessage =
    document.querySelector("#loading-message");

const errorMessage =
    document.querySelector("#error-message");

const productModal =
    document.querySelector("#product-modal");

const modalClose =
    document.querySelector("#modal-close");

const modalImage =
    document.querySelector("#modal-product-image");

const modalCategory =
    document.querySelector("#modal-product-category");

const modalTitle =
    document.querySelector("#modal-product-title");

const modalRating =
    document.querySelector("#modal-product-rating");

const modalPrice =
    document.querySelector("#modal-product-price");

const modalDescription =
    document.querySelector("#modal-product-description");

const modalCartButton =
    document.querySelector(".modal-cart-button");


    function displayProducts(products){
        productContainer.innerHTML = "";
        if(products.length === 0) {
            productContainer.innerHTML= 
            "<p> No products found.</p>";
            return;
        }
        products.forEach((product) => {
             productContainer.innerHTML += `
                <article class="product-card">
                    <div class = "card-Image">
                    <img src = "${product.image}" alt = "${product.name}" class="product-image">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
                    </div>
                    <div class="product-info">
                    <p class="product-category">Category: ${product.category}</p>
                    <h3 class ="product-name">${product.name}</h3>
                    <p class ="product-rating>${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}</p>
                    <p class="product-description">${product.description}</p>
                    <p class= "product-price">KSh ${product.price.toLocaleString()}</p>
                    <button type="button" class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </article>
            `;
        });
        loadingMessage.style.display = "none"
            
}