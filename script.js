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

const searchInput = 
    document.querySelector("#product-search");

const contactForm = 
    document.querySelector(".contact-form");

const contactStatus = 
    document.querySelector("#contact-status");

const contactSubmit = 
    document.querySelector(".form-button");

const newsletterEmail = 
    document.querySelector('#newsletter-email');

const newsletterSubmit = 
    document.querySelector('#newsletter-submit');

const newsletterStatus = 
    document.querySelector('#newsletter-status');



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
                    <button type="button" class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
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
    const searchQuery = searchInput.value.trim().toLowerCase();

    let filteredProducts = [...products];

    if (selectedCategory !== "all") {

        filteredProducts = filteredProducts.filter((product) => {
            return product.category === selectedCategory;
        });
    }

    if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
      );
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
    console.log("id:", productId, "found:", products.find(i => String(i.id) === String(productId)));

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

function closeProductModal() {
    productModal.classList.remove("active");
}

modalClose.addEventListener("click", closeProductModal);

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
  const product = products.find((p) => String(p.id) === String(productId));
  if (!product) return;

  const item = cart.find((i) => String(i.id) === String(productId));
  if (item) {
    item.qty++;
  } else {
    cart.push({ id: product.id, name: product.name, price: Number(product.price), qty: 1 });
  }
  saveCart();
}

modalCartButton.addEventListener("click", () => {
  addToCart(modalCartButton.dataset.productId);
  closeProductModal();
});

displayProducts(products);


function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  fetch('http://localhost:3000/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart }),
  }).catch(() => {}); // don't block the UI if this fails
}

function renderCart() {
  $('#cart-count').text(cart.reduce((n, i) => n + i.qty, 0));
  $('#cart-items').html(cart.map(i => `
    <li>${i.name}
      <button class="qty-decrease" data-id="${i.id}">-</button>
      ${i.qty}
      <button class="qty-increase" data-id="${i.id}">+</button>
      — KSh ${(i.price * i.qty).toFixed(2)}
      <button class="remove" data-id="${i.id}">✕</button>
    </li>`).join(''));
  $('#cart-total').text(
    cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)
  );
}


$(document).on('click', '.add-to-cart-btn', function () {
  console.log('clicked', $(this).data('id'));
  addToCart($(this).data('id'));
});

// toggle panel
$('#cart-btn').on('click', () => $('#cart-panel').toggleClass('hidden'));

// add item (delegated, since cards are rendered dynamically)
$(document).on('click', '.add-to-cart', function () {
    addToCart($(this).data('id'));
  const { id, name, price } = $(this).data();
  const item = cart.find(i => i.id === id);
  item ? item.qty++ : cart.push({ id, name, price: Number(price), qty: 1 });
  saveCart();
});

$(document).on('click', '.remove', function () {
  cart = cart.filter(i => i.id !== $(this).data('id'));
  saveCart();
});


renderCart();


function searchProducts() {
    const searchTerm = $("#product-search").val().toLowerCase();

    const searchedProducts = products.filter(function (product) {
        return product.name.toLowerCase().includes(searchTerm);
    });

    renderProducts(searchedProducts);
}

$("#product-search").on("input", function () {
    searchProducts();
});

searchInput.addEventListener("input", updateProducts);

newsletterSubmit.addEventListener('click', async () => {
  const email = newsletterEmail.value.trim();

  if (!email || !email.includes('@')) {
    newsletterStatus.textContent = "Please enter a valid email address.";
    return;
  }

  newsletterSubmit.disabled = true;
  newsletterSubmit.textContent = "Subscribing...";

  try {
    const res = await fetch('http://localhost:3000/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error('Request failed');

    newsletterStatus.textContent = "You're subscribed! Welcome to Afya Living.";
    newsletterEmail.value = '';
  } catch (err) {
    newsletterStatus.textContent = "Something went wrong. Please try again.";
  } finally {
    newsletterSubmit.disabled = false;
    newsletterSubmit.textContent = "Subscribe";
  }
});



contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.querySelector('#contact-name').value.trim();
  const email = document.querySelector('#contact-email').value.trim();
  const message = document.querySelector('#contact-message').value.trim();

  if (!name || !email || !message) {
    contactStatus.textContent = "Please fill in all fields.";
    return;
  }

  contactSubmit.disabled = true;
  contactSubmit.textContent = "Sending...";

  try {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (!res.ok) throw new Error('Request failed');

    contactStatus.textContent = "Message sent! We'll get back to you soon.";
    contactForm.reset();
  } catch (err) {
    contactStatus.textContent = "Something went wrong. Please try again.";
  } finally {
    contactSubmit.disabled = false;
    contactSubmit.textContent = "Send Message";
  }
});