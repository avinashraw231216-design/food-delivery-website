// ===============================
// Food Items
// ===============================

const foodItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        price: 249,
        image: "PIZZA.jpg"
    },
    {
        id: 2,
        name: "Veg Burger",
        price: 149,
        image: "OIP (2).webp"
    },
    {
        id: 3,
        name: "Veg Noodles",
        price: 179,
        image: "OIP (3).webp"
    }
];


// ===============================
// Shopping Cart
// ===============================

let cart = [];


// ===============================
// Display Food Items
// ===============================

function displayFoodItems() {

    const menu = document.getElementById("food-menu");

    if (!menu) {
        return;
    }

    menu.innerHTML = "";

    foodItems.forEach(function (food) {

        const foodCard = document.createElement("div");

        foodCard.className = "food-card";

        foodCard.innerHTML = `
            <img src="${food.image}" alt="${food.name}">

            <h3>${food.name}</h3>

            <p>₹${food.price}</p>

            <button onclick="addToCart(${food.id})">
                Add to Cart
            </button>
        `;

        menu.appendChild(foodCard);
    });
}


// ===============================
// Add Food To Cart
// ===============================

function addToCart(foodId) {

    const food = foodItems.find(function (item) {
        return item.id === foodId;
    });

    if (!food) {
        return;
    }

    const existingItem = cart.find(function (item) {
        return item.id === foodId;
    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: food.id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1
        });
    }

    updateCart();

    alert(food.name + " added to cart!");
}


// ===============================
// Update Cart
// ===============================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;


    cart.forEach(function (item) {

        total += item.price * item.quantity;

        count += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <span>
                ${item.name}
            </span>

            <span>
                ₹${item.price} × ${item.quantity}
            </span>

            <button onclick="decreaseQuantity(${item.id})">
                -
            </button>

            <button onclick="increaseQuantity(${item.id})">
                +
            </button>
        `;

        cartItems.appendChild(cartItem);
    });


    if (cartCount) {
        cartCount.textContent = count;
    }

    if (cartTotal) {
        cartTotal.textContent = total;
    }
}


// ===============================
// Increase Quantity
// ===============================

function increaseQuantity(foodId) {

    const item = cart.find(function (item) {
        return item.id === foodId;
    });

    if (item) {
        item.quantity++;
    }

    updateCart();
}


// ===============================
// Decrease Quantity
// ===============================

function decreaseQuantity(foodId) {

    const item = cart.find(function (item) {
        return item.id === foodId;
    });

    if (!item) {
        return;
    }

    item.quantity--;


    if (item.quantity <= 0) {

        cart = cart.filter(function (item) {
            return item.id !== foodId;
        });
    }

    updateCart();
}


// ===============================
// Order Now Button
// ===============================

const orderButton = document.getElementById("orderNowBtn");

if (orderButton) {

    orderButton.addEventListener("click", function () {

        const foodSection = document.getElementById("food-section");

        if (foodSection) {

            foodSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


// ===============================
// Load Food Items
// ===============================

displayFoodItems();