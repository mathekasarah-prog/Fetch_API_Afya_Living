function getProducts() {

    $("#loading-message").text("Loading products...");
    $("#error-message").text("");

    $.ajax({
        url: "http://localhost:3000/api/products",
        method: "GET",
        dataType: "json"
    })
    .done(function (products) {

        $("#loading-message").text("");

        $("#product-container").empty();

        products.forEach(function (product) {
            const productCard = `
                <article class="product-card">
                    <div class="card-image">
                    <img src = "${product.image}" alt = "${product.name}" class="product-image">
                    ${product.badge? `<span class="product-badge">${product.badge}</span>`:""}
                    </div>
                    <div class="product-info">
                    <p class="product-category">Category: ${product.category}</p>
                    <h3 class = "product-name">${product.name}</h3>
                    <p class ="product-rating>${"★".repeat(rating)}${"☆".repeat(5 - rating)}
                    <p class="product-description">${product.description}</p>
                    <p class= "product-price">KSh ${product.price.toLocaleString()}</p>
                    <button type="button" class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </article>
            `;

            $("#product-container").append(productCard);
        });
    })
    .fail(function (xhr) {

        $("#loading-message").text("");

        $("#error-message").text(
            `Could not load products. Error: ${xhr.status}`
        );

    });
}
$(function () {
    getProducts();
});