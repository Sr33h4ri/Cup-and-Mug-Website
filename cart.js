function getCart() {
    let cart = localStorage.getItem("cart");

    if (cart === null) {
        return [];
    }

    return JSON.parse(cart);
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartOverlay();
}

function addToCart(productId, quantity) {
    if (quantity === undefined) {
        quantity = 1;
    }

    let cart = getCart();

    let product = null;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
        }
    }

    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity += quantity;
            found = true;
        }
    }

    if (found === false) {
        let newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        };

        cart.push(newItem);
    }

    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = getCart();

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity -= 1;

            if (cart[i].quantity <= 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }

    saveCart(cart);
}

function getCartTotal() {
    let cart = getCart();

    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }

    return total;
}

function updateCartCount() {
    let cart = getCart();

    let count = 0;

    for (let i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
    }

    let badge = document.getElementById("cart-count");

    if (badge !== null) {
        badge.textContent = count;
    }
}

updateCartCount();

function renderCartOverlay() {
    const overlay = document.getElementById("cart-overlay");
    const container = document.getElementById("cart-overlay-items");
    const totalEl = document.getElementById("cart-overlay-total");

    if (!overlay || !container || !totalEl) {
        return;
    }

    const cart = getCart();
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p style='opacity:0.5; padding:1rem 0'>Your cart is empty.</p>";
        totalEl.textContent = "$0.00";
        return;
    }

    for (let i = 0; i < cart.length; i++) {
        container.innerHTML += `
            <div class="cart-overlay-item">
                <span>${cart[i].name} × ${cart[i].quantity}</span>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span>$${(cart[i].price * cart[i].quantity).toFixed(2)}</span>
                    <button type="button" onclick="removeFromCart(${cart[i].id})" style="padding:0.25rem 0.5rem;">Remove</button>
                </div>
            </div>
        `;
    }

    totalEl.textContent = "$" + getCartTotal().toFixed(2);
}

function openCart() {
    const overlay = document.getElementById("cart-overlay");
    if (overlay) {
        renderCartOverlay();
        overlay.style.display = "block";
    }
}

function closeCart() {
    const overlay = document.getElementById("cart-overlay");
    if (overlay) {
        overlay.style.display = "none";
    }
}