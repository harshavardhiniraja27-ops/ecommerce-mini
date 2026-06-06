let products = [
    {
        id: 1,
        name: "MacBook Air M2",
        price: 114900,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 2,
        name: "Luxury Makeup Kit",
        price: 4999,
        category: "beauty",
        image: "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,
        name: "Sony Headphones",
        price: 14990,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,
        name: "Apple Watch",
        price: 41900,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 5,
        name: "Nike Sneakers",
        price: 5999,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "Premium Chips",
        price: 899,
        category: "snacks",
        image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 7,
        name: "Gaming Mouse",
        price: 2499,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 8,
        name: "Mechanical Keyboard",
        price: 6999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 9,
        name: "Luxury Perfume Set",
        price: 2999,
        category: "beauty",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 10,
        name: "DarkChocolate Brownie ",
        price: 599,
        category: "snacks",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
    }
];

/* ---------------- DOM ELEMENTS ---------------- */
let container = document.getElementById("products");
let searchInput = document.getElementById("search");

/* ---------------- DISPLAY PRODUCTS ---------------- */
function display(list) {
    container.innerHTML = "";

    list.forEach(p => {
        let card = document.createElement("div");
        card.className = "product";

        card.innerHTML = `
      <div class="imgBox">
        <img src="${p.image}" alt="${p.name}">
      </div>

      <div class="info">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price.toLocaleString()}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;

        container.appendChild(card);
    });
}

/* ---------------- CART SYSTEM ---------------- */
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === id);

    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast("Added to cart 🛒");
}

/* ---------------- TOAST ---------------- */
function toast(msg) {
    let t = document.createElement("div");
    t.innerText = msg;

    t.style.position = "fixed";
    t.style.bottom = "20px";
    t.style.right = "20px";
    t.style.background = "#111827";
    t.style.color = "white";
    t.style.padding = "12px 18px";
    t.style.borderRadius = "10px";
    t.style.zIndex = "1000";
    t.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";

    document.body.appendChild(t);

    setTimeout(() => t.remove(), 1500);
}

/* ---------------- SEARCH ---------------- */
if (searchInput) {
    searchInput.addEventListener("input", e => {
        let value = e.target.value.toLowerCase();

        let filtered = products.filter(p =>
            p.name.toLowerCase().includes(value)
        );

        display(filtered);
    });
}

/* ---------------- CATEGORY FILTER ---------------- */
function filterCategory(cat) {
    if (cat === "all") {
        display(products);
        return;
    }

    let filtered = products.filter(p => p.category === cat);
    display(filtered);
}

/* ---------------- INIT ---------------- */
display(products);