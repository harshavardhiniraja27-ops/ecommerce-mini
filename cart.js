let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("cart");
let totalText = document.getElementById("total");

function displayCart() {
    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        let div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
      <div class="imgBox">
        <img src="${item.image}">
      </div>

      <div class="info">
        <h3>${item.name}</h3>
        <p class="price">₹${item.price.toLocaleString()}</p>

        <div class="qty">
          <button onclick="decrease(${index})">-</button>
          <span>${item.qty}</span>
          <button onclick="increase(${index})">+</button>
        </div>

        <button class="remove" onclick="removeItem(${index})">Remove</button>
      </div>
    `;

        container.appendChild(div);
    });

    totalText.innerText = "Total: ₹" + total.toLocaleString();
}

/* QTY CONTROL */
function increase(i) {
    cart[i].qty++;
    update();
}

function decrease(i) {
    if (cart[i].qty > 1) {
        cart[i].qty--;
    }
    update();
}

function removeItem(i) {
    cart.splice(i, 1);
    update();
}

function update() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

/* CHECKOUT */
function checkout() {
    alert("🎉 Order placed successfully!");
    localStorage.removeItem("cart");
    location.reload();
}

displayCart();