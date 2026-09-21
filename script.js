const products = [
  {
    id: "prata",
    name: "VIP Prata",
    material: "Ferro",
    price: 7,
    image: "prata.svg",
    description: "Entrada na hierarquia VIP do Bigorna MC."
  },
  {
    id: "ouro",
    name: "VIP Ouro",
    material: "Ouro",
    price: 10,
    image: "ouro.svg",
    description: "Benefícios especiais para jogadores VIP."
  },
  {
    id: "esmeralda",
    name: "VIP Esmeralda",
    material: "Esmeralda",
    price: 13,
    image: "esmeralda.svg",
    description: "Mais vantagens e destaque dentro do servidor."
  },
  {
    id: "diamante",
    name: "VIP Diamante",
    material: "Diamante",
    price: 16,
    image: "diamante.svg",
    description: "Um dos principais níveis VIP do Bigorna MC."
  },
  {
    id: "celestial",
    name: "VIP Celestial",
    material: "Netherite",
    price: 20,
    image: "celestial.svg",
    description: "O nível máximo da loja Bigorna MC."
  }
];

let cart = [];

const productsGrid = document.getElementById("productsGrid");
const modal = document.getElementById("modal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");
const closeModal = document.getElementById("closeModal");
const continueShopping = document.getElementById("continueShopping");
const checkoutButton = document.getElementById("checkoutButton");
const toast = document.getElementById("toast");


// ================================
// MOSTRAR PRODUTOS
// ================================

function renderProducts() {
  if (!productsGrid) return;

  productsGrid.innerHTML = products.map(product => `
    <article class="product-card">

      <div
        class="product-image"
        style="background-image: url('${product.image}')"
      ></div>

      <div class="product-content">

        <div class="product-material">
          ${product.material}
        </div>

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="product-bottom">

          <strong>
            R$ ${product.price.toFixed(2).replace(".", ",")}
          </strong>

          <div class="product-actions">

            <button
              class="buy-button"
              onclick="buyNow('${product.id}')"
            >
              COMPRAR AGORA
            </button>

            <button
              class="cart-button"
              onclick="addToCart('${product.id}')"
            >
              ADICIONAR AO CARRINHO
            </button>

          </div>

        </div>

      </div>

    </article>
  `).join("");
}


// ================================
// ADICIONAR AO CARRINHO
// ================================

function addToCart(productId) {

  const product = products.find(p => p.id === productId);

  if (!product) return;

  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCart();

  showToast(`${product.name} adicionado ao carrinho!`);
}


// ================================
// COMPRAR AGORA
// ================================

function buyNow(productId) {

  const product = products.find(p => p.id === productId);

  if (!product) return;

  cart = [
    {
      ...product,
      quantity: 1
    }
  ];

  updateCart();

  openCart();
}


// ================================
// ATUALIZAR CARRINHO
// ================================

function updateCart() {

  if (!cartItems || !cartTotal || !cartCount) return;

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h3>Seu carrinho está vazio</h3>
        <p>Adicione um VIP para começar sua compra.</p>
      </div>
    `;

    cartTotal.textContent = "R$ 0,00";
    cartCount.textContent = "0";

    return;
  }


  cartItems.innerHTML = cart.map(item => {

    const subtotal = item.price * item.quantity;

    return `
      <div class="cart-item">

        <div
          class="cart-item-image"
          style="background-image: url('${item.image}')"
        ></div>

        <div class="cart-item-info">

          <h4>${item.name}</h4>

          <span>${item.material}</span>

          <strong>
            R$ ${item.price.toFixed(2).replace(".", ",")}
          </strong>

        </div>

        <div class="cart-item-actions">

          <button onclick="changeQuantity('${item.id}', -1)">
            −
          </button>

          <span>${item.quantity}</span>

          <button onclick="changeQuantity('${item.id}', 1)">
            +
          </button>

          <button
            class="remove-button"
            onclick="removeFromCart('${item.id}')"
          >
            REMOVER
          </button>

        </div>

        <div class="cart-subtotal">
          R$ ${subtotal.toFixed(2).replace(".", ",")}
        </div>

      </div>
    `;

  }).join("");


  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const quantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  cartTotal.textContent =
    `R$ ${total.toFixed(2).replace(".", ",")}`;

  cartCount.textContent = quantity;
}


// ================================
// ALTERAR QUANTIDADE
// ================================

function changeQuantity(productId, amount) {

  const item = cart.find(item => item.id === productId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  }

  updateCart();
}


// ================================
// REMOVER
// ================================

function removeFromCart(productId) {

  cart = cart.filter(item => item.id !== productId);

  updateCart();

  showToast("Produto removido do carrinho.");
}


// ================================
// ABRIR CARRINHO
// ================================

function openCart() {

  if (!modal) return;

  modal.hidden = false;

  document.body.classList.add("modal-open");
}


// ================================
// FECHAR CARRINHO
// ================================

function closeCart() {

  if (!modal) return;

  modal.hidden = true;

  document.body.classList.remove("modal-open");
}


// ================================
// BOTÃO DO CARRINHO
// ================================

if (cartButton) {
  cartButton.addEventListener("click", openCart);
}


// ================================
// FECHAR
// ================================

if (closeModal) {
  closeModal.addEventListener("click", closeCart);
}


if (continueShopping) {
  continueShopping.addEventListener("click", closeCart);
}


// ================================
// CLICAR FORA DO MODAL
// ================================

if (modal) {

  modal.addEventListener("click", event => {

    if (event.target === modal) {
      closeCart();
    }

  });

}


// ================================
// CHECKOUT
// ================================

if (checkoutButton) {

  checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {
      showToast("Seu carrinho está vazio.");
      return;
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    showToast(
      `Pagamento iniciado — total R$ ${total
        .toFixed(2)
        .replace(".", ",")}`
    );

  });

}


// ================================
// TOAST
// ================================

function showToast(message) {

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


// ================================
// PARTÍCULAS
// ================================

function createParticles() {

  const container = document.getElementById("particles");

  if (!container) return;

  const amount = 35;

  for (let i = 0; i < amount; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.animationDelay =
      Math.random() * 8 + "s";

    particle.style.animationDuration =
      5 + Math.random() * 8 + "s";

    particle.style.opacity =
      0.2 + Math.random() * 0.6;

    container.appendChild(particle);
  }
}


// ================================
// INICIAR SITE
// ================================

renderProducts();
updateCart();
createParticles();
