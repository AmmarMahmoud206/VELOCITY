// User Info

let userInfo = document.querySelector("#user_info");
let userdata = document.querySelector("#user");
let links = document.querySelector("#links");

if (localStorage.getItem("loggedIn")) {
  if (links) {
    links.remove();
  }

  if (userInfo) {
    userInfo.style.display = "flex";
  }

  if (userdata) {
    userdata.innerHTML = `Hello, ${localStorage.getItem("firstName")}`;
  }
}

// Search Products

let searchBox = document.querySelector("#searchBox");
let searchType = document.querySelector("#searchType");

function searchProducts() {
  let searchValue = searchBox.value.toLowerCase();
  let products = document.querySelectorAll(".product");

  for (let i = 0; i < products.length; i++) {
    if (searchType.value === "name") {
      let productName = products[i].querySelector("h5").innerText.toLowerCase();

      if (productName.includes(searchValue)) {
        products[i].style.display = "block";
      } else {
        products[i].style.display = "none";
      }
    } else if (searchType.value === "category") {
      let productCategory = products[i]
        .querySelectorAll("p")[1]
        .innerText.toLowerCase();

      if (productCategory.includes(searchValue)) {
        products[i].style.display = "block";
      } else {
        products[i].style.display = "none";
      }
    }
  }
}

// Logout

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("cart");
  localStorage.removeItem("favorites");

  window.location = "index.html";
}

// Products Data

let allProducts = [
  {
    id: 1,
    name: "360° Magnetic Phone Holder",
    price: 210,
    category: "Phone Holders",
    image: "images/img1.jpg",
  },

  {
    id: 2,
    name: "MOMO 38W Fast Car Charger",
    price: 250,
    category: "Car Chargers",
    image: "images/img2.jpg",
  },

  {
    id: 3,
    name: "Car Trunk Organizer",
    price: 324,
    category: "Car Organizers",
    image: "images/img3.jpg",
  },

  {
    id: 4,
    name: "TirePro 12V Air Compressor",
    price: 912,
    category: "Car Care",
    image: "images/img4.jpg",
  },

  {
    id: 5,
    name: "Jumbo 12V Car Vacuum Cleaner",
    price: 922,
    category: "Car Care",
    image: "images/img5.jpg",
  },

  {
    id: 6,
    name: "1080P Car Dash Camera",
    price: 2232,
    category: "Car Electronics",
    image: "images/img6.jpg",
  },

  {
    id: 7,
    name: "Car Seat Back Organizer",
    price: 592,
    category: "Car Organizers",
    image: "images/img7.jpg",
  },

  {
    id: 8,
    name: "LED Door Logo Projector",
    price: 542,
    category: "Car Lighting",
    image: "images/img8.jpg",
  },

  {
    id: 9,
    name: "Car Diagnostic Scanner",
    price: 952,
    category: "Car Electronics",
    image: "images/img9.jpg",
  },
];

// Add or Remove Product From Cart

function toggleCart(productId) {
  if (!localStorage.getItem("loggedIn")) {
    window.location = "login.html";
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex !== -1) {
    cart = cart.filter((item) => item.id !== productId);
  } else {
    let product = allProducts.find((item) => item.id === productId);

    if (!product) return;

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  displayProducts();
}

// Update Cart Count

function updateCartCount() {
  let cartCount = document.querySelector("#cart-count");

  if (!cartCount) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity;
  }

  cartCount.innerHTML = total;

  if (total === 0) {
    cartCount.classList.add("hidden");
  } else {
    cartCount.classList.remove("hidden");
  }
}

// Display Products

let productsContainer = document.querySelector("#products-container");

function displayProducts() {
  productsContainer.innerHTML = "";

  for (let i = 0; i < allProducts.length; i++) {
    productsContainer.innerHTML += `
            <div class="product group overflow-hidden rounded-[4px] border border-white/10 bg-[#1C2732] transition-all duration-300 hover:-translate-y-[8px] hover:border-2 hover:border-[#FF5A1F] hover:shadow-[0_8px_20px_rgba(255,90,31,0.15)]">

                <div class="w-full h-[300px] overflow-hidden">
                    <img src="${allProducts[i].image}" alt="${allProducts[i].name}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
                </div>

                <div class="p-5 text-center">
                   <div class="mx-auto w-full text-center">

                        <h5 class="mb-3 text-xl font-medium leading-[1.2] text-[#F5F5F5]">
                            ${allProducts[i].name}
                        </h5>

                        <p class="mb-4 leading-6 text-[#9CA3AF]">
                            Price: ${allProducts[i].price} EGP
                        </p>

                        <p class="mb-4 text-base leading-6 text-[#9CA3AF]">
                            Category: ${allProducts[i].category}
                        </p>

                       <div class="flex items-center justify-center gap-4">

                            <i class="fas fa-heart cursor-pointer text-base
                                ${
                                  JSON.parse(
                                    localStorage.getItem("favorites") || "[]",
                                  ).some(
                                    (item) => item.id === allProducts[i].id,
                                  )
                                    ? "text-[#FF5A1F]"
                                    : "text-[#9CA3AF]"
                                }"
                                onclick="toggleFavorite(${allProducts[i].id})"></i>

                            <button onclick="toggleCart(${allProducts[i].id})"
                                class="rounded-[4px] border px-3 py-[6px] text-base text-white transition-colors
                                ${
                                  JSON.parse(
                                    localStorage.getItem("cart") || "[]",
                                  ).some(
                                    (item) => item.id === allProducts[i].id,
                                  )
                                    ? "border-[#dc3545] bg-[#dc3545] hover:border-[#c82333] hover:bg-[#c82333]"
                                    : "border-[#FF5A1F] bg-[#FF5A1F] hover:border-[#E64A19] hover:bg-[#E64A19]"
                                }">

                                ${
                                  JSON.parse(
                                    localStorage.getItem("cart") || "[]",
                                  ).some(
                                    (item) => item.id === allProducts[i].id,
                                  )
                                    ? "Remove from Cart"
                                    : "Add to Cart"
                                }

                            </button>

                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}

// Add or Remove Product From Favorites

function toggleFavorite(productId) {
  if (!localStorage.getItem("loggedIn")) {
    window.location = "login.html";
    return;
  }

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  let index = favorites.findIndex((item) => item.id === productId);

  if (index !== -1) {
    favorites.splice(index, 1);
  } else {
    let product = allProducts.find((item) => item.id === productId);

    if (!product) return;

    favorites.push(product);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  if (productsContainer) {
    displayProducts();
  }

  displayFavoriteItems();
}

// Display Favorite Items

function displayFavoriteItems() {
  let favoriteItems = document.querySelector("#favorite-items");

  if (!favoriteItems) return;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favoriteItems.innerHTML = "";

  if (favorites.length === 0) {
    favoriteItems.innerHTML = `
         <p class="col-span-full py-8 text-center text-lg font-medium text-[#FF5A1F]">
    You have no favorite items.
</p>
        `;

    return;
  }

  for (let i = 0; i < favorites.length; i++) {
    favoriteItems.innerHTML += `
            <div class="overflow-hidden rounded-[5px] border border-white/10 bg-[#1C2732] transition-all duration-300 hover:-translate-y-[8px] hover:border-2 hover:border-[#FF5A1F] hover:shadow-[0_8px_20px_rgba(255,90,31,0.15)]">

                <div class="h-[220px] w-full overflow-hidden">
                    <img src="${favorites[i].image}"
                        alt="${favorites[i].name}"
                        class="h-full w-full object-cover">
                </div>

                <div class="px-4 pb-3 pt-3 text-center">

                    <h3 class="mb-2 text-xl font-medium text-[#F5F5F5]">
                        ${favorites[i].name}
                    </h3>

                    <p class="mb-3 text-base text-[#9CA3AF]">
                        Category: ${favorites[i].category}
                    </p>

                    <i class="fas fa-heart cursor-pointer text-xl text-[#FF5A1F]"
                        onclick="toggleFavorite(${favorites[i].id})">
                    </i>

                </div>
            </div>
        `;
  }
}

if (productsContainer) {
  displayProducts();
}

updateCartCount();

// Toggle Cart Dropdown

function toggleCartDropdown() {
  let cartDropdown = document.querySelector("#cart-dropdown");

  displayCartDropdown();

  cartDropdown.classList.toggle("hidden");
}

// Display Cart Dropdown Items

function displayCartDropdown() {
  let dropdownItems = document.querySelector("#cart-dropdown-items");

  if (!dropdownItems) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  dropdownItems.innerHTML = "";

  if (cart.length === 0) {
    dropdownItems.innerHTML = `
            <p class="p-4 text-center text-[#9CA3AF]">
                Your cart is empty
            </p>
        `;

    return;
  }

  for (let i = 0; i < cart.length; i++) {
    dropdownItems.innerHTML += `
            <div class="mb-3 grid grid-cols-[1fr_70px] gap-2 rounded-lg border border-white/10 bg-[#0B0F14] p-[10px]">

                <div class="min-w-0">

                    <h5 class="mb-3 w-[85px] whitespace-normal break-words text-lg font-semibold leading-tight text-[#F5F5F5]">
                        ${cart[i].name}
                    </h5>

                    <div class="flex items-center gap-2">

                        <button class="size-8 rounded border border-[#FF5A1F] text-[#FF5A1F] font-bold transition-colors hover:bg-[#FF5A1F] hover:text-white"
                            onclick="changeQuantity(${cart[i].id}, -1)">
                            -
                        </button>

                        <span class="text-white">${cart[i].quantity}</span>

                        <button class="size-8 rounded border border-[#FF5A1F] text-[#FF5A1F] font-bold transition-colors hover:bg-[#FF5A1F] hover:text-white"
                            onclick="changeQuantity(${cart[i].id}, 1)">
                            +
                        </button>

                    </div>
                </div>

                <div class="text-lg text-[#9CA3AF]">
                    <p>Price:</p>
                    <p class="text-[#FF5A1F]">${cart[i].price * cart[i].quantity} EGP</p>
                </div>

            </div>
        `;
  }
}

// Change Product Quantity

function changeQuantity(productId, amount) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart[i].quantity += amount;

      if (cart[i].quantity <= 0) {
        cart.splice(i, 1);
      }

      break;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  displayCartDropdown();
  displayCartItems();

  if (productsContainer) {
    displayProducts();
  }
}

// Remove Product From Cart

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(function (item) {
    return item.id !== productId;
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  displayCartDropdown();
  displayCartItems();
}

// Display Cart Items

function displayCartItems() {
  let cartItems = document.querySelector("#cart-items");

  if (!cartItems) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
<p class="col-span-full py-8 text-center text-xl font-medium text-[#FF5A1F]">
    Your cart is empty.
</p>
        `;
  }

  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;

    cartItems.innerHTML += `
            <div class="flex h-[235px] items-center gap-6 rounded border border-white/10 bg-[#1C2732] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-2 hover:border-[#FF5A1F] hover:shadow-lg">

                <img src="${cart[i].image}"
                    alt="${cart[i].name}"
                    class="h-[120px] w-[120px] shrink-0 rounded-xl object-cover">

                <div class="flex-1">

                    <h3 class="mb-3 text-xl font-medium text-[#F5F5F5]">
                        ${cart[i].name}
                    </h3>

                    <p class="mb-4 text-base text-[#9CA3AF]">
                        Category: ${cart[i].category}
                    </p>

                    <p class="mb-4 text-base text-[#9CA3AF]">
                        Price: ${cart[i].price} EGP
                    </p>

                    <div class="flex items-center gap-2">

                        <button onclick="changeQuantity(${cart[i].id}, -1)"
                            class="h-9 w-7 rounded border border-[#FF5A1F] text-sm text-[#FF5A1F] transition-colors hover:bg-[#FF5A1F] hover:text-white">
                            -
                        </button>

                        <span class="text-sm text-white">${cart[i].quantity}</span>

                        <button onclick="changeQuantity(${cart[i].id}, 1)"
                            class="h-9 w-7 rounded border border-[#FF5A1F] text-sm text-[#FF5A1F] transition-colors hover:bg-[#FF5A1F] hover:text-white">
                            +
                        </button>

                        <button onclick="removeFromCart(${cart[i].id})"
                            class="ml-5 rounded bg-[#dc3545] px-3 py-2 text-sm text-white transition-colors hover:bg-[#c82333]">
                            Remove from Cart
                        </button>

                    </div>
                </div>
            </div>
        `;
  }

  document.querySelector("#totalPrice").innerHTML = total.toFixed(2);
}

displayCartItems();

// Update Pages When Returning Back

window.addEventListener("pageshow", function () {
  updateCartCount();

  if (productsContainer) {
    displayProducts();
  }

  displayCartItems();
  displayCartDropdown();
  displayFavoriteItems();
});

displayFavoriteItems();
