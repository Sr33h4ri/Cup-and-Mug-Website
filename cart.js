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
}

function addToCart(productId, quantity) {
    if (quantity === undefined) {
        quantity = 1;
    }

    let cart = getCart();

    let product = null;

    // find product manually
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
        }
    }

    let found = false;

    // check if already in cart
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity += quantity;
            found = true;
        }
    }

    // if not found, add new item
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

    let newCart = [];

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== productId) {
            newCart.push(cart[i]);
        }
    }

    saveCart(newCart);
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


function openCart() {
    document.getElementById("cart-overlay").style.display = "block"
}

function closeCart() {
    document.getElementById("cart-overlay").style.display = "none"
}