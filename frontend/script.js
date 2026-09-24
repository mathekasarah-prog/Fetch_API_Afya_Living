function showToast(message, type = 'info') {
  const toast = $(`<div class="toast ${type}">${message}</div>`);
  $('#toast-container').append(toast);

  setTimeout(() => toast.addClass('show'), 10);

  setTimeout(() => {
    toast.removeClass('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- DOM references ----
const productContainer = document.querySelector('#product-container'); // adjust to your actual container ID
const loadingMessage = document.querySelector('#loading-message');
const errorMessage = document.querySelector('#error-message');
const categoryFilter = document.querySelector('#category-filter');
const sortProducts = document.querySelector('#sort-products');
const searchInput = document.querySelector('#product-search');

const productModal = document.querySelector('#product-modal');
const modalClose = document.querySelector('#modal-close');
const modalImage = document.querySelector('#modal-product-image');
const modalCategory = document.querySelector('#modal-product-category');
const modalTitle = document.querySelector('#modal-product-title');
const modalRating = document.querySelector('#modal-product-rating');
const modalPrice = document.querySelector('#modal-product-price');
const modalDescription = document.querySelector('#modal-product-description');
const modalCartButton = document.querySelector('.modal-cart-button');

const newsletterSubmit = document.querySelector('#newsletter-submit');
const newsletterEmail = document.querySelector('#newsletter-email');
const newsletterStatus = document.querySelector('#newsletter-status');

const contactForm = document.querySelector('.contact-form');
const contactSubmit = document.querySelector('#contact-submit');
const contactStatus = document.querySelector('#contact-status');

let products = [];

// Fetch + display products 
async function getProducts() {
  try {
    loadingMessage.textContent = 'Loading products...';
    errorMessage.textContent = '';

    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    products = await response.json();
    displayProducts(products);
    loadingMessage.textContent = '';
  } catch (error) {
    loadingMessage.textContent = '';
    errorMessage.textContent = 'Failed to load products. Please try again later.';
  }
}

function displayProducts(productsToShow) {
  productContainer.innerHTML = '';
  if (productsToShow.length === 0) {
    productContainer.innerHTML = '<p>No products found.</p>';
    return;
  }

  productsToShow.forEach((product) => {
    productContainer.innerHTML += `
      <article class="product-card">
        <div class="card-image">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-info">
          <p class="product-category">Category: ${product.category}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-rating">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</p>
          <p class="product-description">${product.description}</p>
          <p class="product-price">KSh ${product.price.toLocaleString()}</p>
          <div class="qty-selector">
            <button type="button" class="qty-minus" data-id="${product.id}">-</button>
            <span class="qty-value" data-id="${product.id}">1</span>
            <button type="button" class="qty-plus" data-id="${product.id}">+</button>
          </div>
          <button type="button" class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
          <button type="button" class="view-product" data-product-id="${product.id}">View Details</button>
        </div>
      </article>
    `;
  });
}

// ---- Filter / sort / search ----
function updateProducts() {
  const selectedCategory = categoryFilter.value;
  const selectedSort = sortProducts.value;
  const searchQuery = searchInput.value.trim().toLowerCase();

  let filteredProducts = [...products];

  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery)
    );
  }

  if (selectedSort === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filteredProducts);
}

// ---- Product modal ----
function openProductModal(productId) {
  const product = products.find(item => String(item.id) === String(productId));
  if (!product) return;

  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalCategory.textContent = product.category;
  modalTitle.textContent = product.name;
  modalRating.innerHTML = `${'★'.repeat(product.rating)}<span>(${product.reviews})</span>`;
  modalPrice.textContent = `KSh ${product.price.toLocaleString()}`;
  modalDescription.textContent = product.description;
  modalCartButton.dataset.productId = product.id;

  productModal.classList.add('active');
}

function closeProductModal() {
  productModal.classList.remove('active');
}

modalClose.addEventListener('click', closeProductModal);

productModal.addEventListener('click', (event) => {
  if (event.target === productModal) closeProductModal();
});

productContainer.addEventListener('click', (event) => {
  const button = event.target.closest('.view-product');
  if (!button) return;
  const productId = Number(button.dataset.productId);
  openProductModal(productId);
});

categoryFilter.addEventListener('change', updateProducts);
sortProducts.addEventListener('change', updateProducts);
searchInput.addEventListener('input', updateProducts);

// ---- Cart ----
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, qty = 1) {
  const product = products.find(p => String(p.id) === String(productId));
  if (!product) return;

  const item = cart.find(i => String(i.id) === String(productId));
  if (item) {
    item.qty += qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: Number(product.price), qty });
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  fetch('http://localhost:3000/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart })
  }).catch(() => {});
}

function renderCart() {
  $('#cart-count').text(cart.reduce((n, i) => n + i.qty, 0));
  $('#cart-items').html(cart.map(i => `
    <li>${i.name}
      <button class="qty-decrease" data-id="${i.id}">-</button>
      ${i.qty}
      <button class="qty-increase" data-id="${i.id}">+</button>
      — KSh ${(i.price * i.qty).toFixed(2)}
      <button class="remove" data-id="${i.id}">×</button>
    </li>
  `).join(''));
  $('#cart-total').text(
    cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)
  );
}

modalCartButton.addEventListener('click', () => {
  addToCart(modalCartButton.dataset.productId);
  closeProductModal();
});

$(document).on('click', '.add-to-cart-btn', function () {
  const id = $(this).data('id');
  const qtySpan = $(`.qty-value[data-id="${id}"]`);
  const qty = qtySpan.length ? Number(qtySpan.text()) : 1;
  addToCart(id, qty);
  showToast('Added to cart!', 'success');
});

$('#cart-btn').on('click', () => $('#cart-panel').toggleClass('hidden'));

$(document).on('click', '.remove', function () {
  cart = cart.filter(i => i.id !== $(this).data('id'));
  saveCart();
});

$(document).on('click', '.qty-increase', function () {
  const item = cart.find(i => i.id === $(this).data('id'));
  if (item) item.qty++;
  saveCart();
});

$(document).on('click', '.qty-plus', function () {
  const id = $(this).data('id');
  const span = $(`.qty-value[data-id="${id}"]`);
  span.text(Number(span.text()) + 1);
});

$(document).on('click', '.qty-minus', function () {
  const id = $(this).data('id');
  const span = $(`.qty-value[data-id="${id}"]`);
  const newVal = Math.max(1, Number(span.text()) - 1);
  span.text(newVal);
});

$(document).on('click', '.qty-decrease', function () {
  const item = cart.find(i => i.id === $(this).data('id'));
  if (item) {
    item.qty--;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== item.id);
  }
  saveCart();
});

renderCart();

// ---- Auth ----
let currentUser = null;

function updateAuthUI() {
  if (currentUser) {
    $('#auth-btn').text(`${currentUser.name} (Logout)`);
  } else {
    $('#auth-btn').text('Login');
  }
}
updateAuthUI();

$('#auth-btn').on('click', () => {
  if (currentUser) {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
  } else {
    $('#auth-modal').addClass('active');
  }
});

$('#auth-modal-close').on('click', () => $('#auth-modal').removeClass('active'));

let showingSignup = true;

$('#auth-switch-link').on('click', function (e) {
  e.preventDefault();
  showingSignup = !showingSignup;

  if (showingSignup) {
    $('#signup-form').removeClass('hidden');
    $('#login-form').addClass('hidden');
    $('#auth-heading').text('Create your account');
    $('#switch-text').text('Already have an account?');
    $(this).text('Sign In');
  } else {
    $('#login-form').removeClass('hidden');
    $('#signup-form').addClass('hidden');
    $('#auth-heading').text('Welcome back');
    $('#switch-text').text("Don't have an account?");
    $(this).text('Create one');
  }

  $('#auth-status').text('');
});

$('#signup-form').on('submit', async function (e) {
  e.preventDefault();
  const name = $('#signup-name').val().trim();
  const email = $('#signup-email').val().trim();
  const password = $('#signup-password').val();

  const res = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();

  if (res.ok) {
    currentUser = data.user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    $('#auth-modal').removeClass('active');
  } else {
    $('#auth-status').text(data.error);
  }
});

$('#login-form').on('submit', async function (e) {
  e.preventDefault();
  const email = $('#login-email').val().trim();
  const password = $('#login-password').val();

  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();

  if (res.ok) {
    currentUser = data.user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    $('#auth-modal').removeClass('active');
  } else {
    $('#auth-status').text(data.error);
  }
});

// ---- Checkout (gated by login) ----
    $('#checkout-btn').on('click', () => {
  if (cart.length === 0) {
    showToast('Your cart is empty.', 'error');
    return;
  }
  if (!currentUser) {
    showToast('Please log in or sign up to place an order.', 'error');
    $('#auth-modal').addClass('active');
    return;
  }

  const summary = cart.map(i =>
    `<p>${i.name} x${i.qty} — KSh ${(i.price * i.qty).toLocaleString()}</p>`
  ).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  $('#checkout-summary').html(summary + `<p><strong>Total: KSh ${total.toLocaleString()}</strong></p>`);
  $('#checkout-status').text('').removeClass('success');
  $('#checkout-modal').addClass('active');
});

  const summary = cart.map(i =>
    `<p>${i.name} x${i.qty} — KSh ${(i.price * i.qty).toLocaleString()}</p>`
  ).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  $('#checkout-summary').html(summary + `<p><strong>Total: KSh ${total.toLocaleString()}</strong></p>`);
  $('#checkout-status').text('').removeClass('success');
  $('#checkout-modal').addClass('active');
});

$('#checkout-modal-close').on('click', () => $('#checkout-modal').removeClass('active'));

$('#checkout-form').on('submit', async function (e) {
  e.preventDefault();
  const name = $('#checkout-name').val().trim();
  const phone = $('#checkout-phone').val().trim();
  const address = $('#checkout-address').val().trim();

  if (!name || !phone || !address) {
    $('#checkout-status').text('Please fill in all fields.');
    return;
  }

  $('#checkout-submit').prop('disabled', true).text('Placing order...');

  try {
    const res = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, address, cart, userId: currentUser?.id })
    });
    if (!res.ok) throw new Error('Order failed');

    $('#checkout-status').text('Order successful!').addClass('success');
    cart = [];
    saveCart();
    $('#checkout-form')[0].reset();
    setTimeout(() => $('#checkout-modal').removeClass('active'), 2000);
  } catch (err) {
    $('#checkout-status').text('Something went wrong. Please try again.');
  } finally {
    $('#checkout-submit').prop('disabled', false).text('Place Order');
  }
});

// ---- Newsletter ----
newsletterSubmit.addEventListener('click', async () => {
  const email = newsletterEmail.value.trim();
  if (!email || !email.includes('@')) {
    newsletterStatus.textContent = 'Please enter a valid email address.';
    return;
  }

  newsletterSubmit.disabled = true;
  newsletterSubmit.textContent = 'Subscribing...';

  try {
    const res = await fetch('http://localhost:3000/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error('Request failed');

    newsletterStatus.textContent = "You're subscribed! Welcome to Afya Living.";
    newsletterEmail.value = '';
  } catch (err) {
    newsletterStatus.textContent = 'Something went wrong. Please try again.';
  } finally {
    newsletterSubmit.disabled = false;
    newsletterSubmit.textContent = 'Subscribe';
  }
});

// ---- Contact form ----
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.querySelector('#contact-name').value.trim();
  const email = document.querySelector('#contact-email').value.trim();
  const message = document.querySelector('#contact-message').value.trim();

  if (!name || !email || !message) {
    contactStatus.textContent = 'Please fill in all fields.';
    return;
  }

  contactSubmit.disabled = true;
  contactSubmit.textContent = 'Sending...';

  try {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    if (!res.ok) throw new Error('Request failed');

    contactStatus.textContent = "Message sent! We'll get back to you soon.";
    contactForm.reset();
  } catch (err) {
    contactStatus.textContent = 'Something went wrong. Please try again.';
  } finally {
    contactSubmit.disabled = false;
    contactSubmit.textContent = 'Send Message';
  }
});

// ---- Init ----
getProducts();














