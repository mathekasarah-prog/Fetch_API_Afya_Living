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
                    <p class ="product-rating">${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}</p>
                    <p class="product-description">${product.description}</p>
                    <p class= "product-price">KSh ${product.price.toLocaleString()}</p>
                    <button type="button" class="add-to-cart-btn">Add to Cart</button>
                    <button type="button" class="view-product" data-product-id="${product.id}">View Details</button>
                    </div>
                </article>
            `;
        });
        loadingMessage.style.display = "none"
            
}



function updateProducts() {

    const selectedCategory = categoryFilter.value;
    const selectedSort = sortProducts.value;

    let filteredProducts = [...products];

    if (selectedCategory !== "all") {

        filteredProducts = filteredProducts.filter((product) => {
            return product.category === selectedCategory;
        });
    }

    if (selectedSort === "price-low") {

        filteredProducts.sort((a, b) => a.price - b.price);

    } else if (selectedSort === "price-high") {

        filteredProducts.sort((a, b) => b.price - a.price);

    } else if (selectedSort === "rating") {

        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    displayProducts(filteredProducts);
}


function openProductModal(productId) {
    

    const product = products.find((item) => {
        return item.id === productId;
    });

    if (!product) return;

    modalImage.src = product.image;
    modalImage.alt = product.name;

    modalCategory.textContent = product.category;
    modalTitle.textContent = product.name;

    modalRating.innerHTML =
        `${"★".repeat(product.rating)}
        <span>(${product.reviews})</span>`;

    modalPrice.textContent =
        `KSh ${product.price.toLocaleString()}`;

    modalDescription.textContent = product.description;

    modalCartButton.dataset.productId = product.id;

    productModal.classList.add("active");
}


function closeProductModal() {
    productModal.classList.remove("active");
}

modalClose.addEventListener("click", closeProductModal);

productModal.addEventListener("click", (event) => {

    if (event.target === productModal) {
        closeProductModal();
    }
});


productContainer.addEventListener("click", (event) => {

    const button = event.target.closest(".view-product");

    if (!button) return;

    const productId = Number(button.dataset.productId);

    openProductModal(productId);
});



productContainer.addEventListener("click", (event) => {

    const button = event.target.closest(".view-product");

    if (!button) return;

    const productId = Number(button.dataset.productId);

    openProductModal(productId);
});

categoryFilter.addEventListener("change", updateProducts);
sortProducts.addEventListener("change", updateProducts);
displayProducts(products);