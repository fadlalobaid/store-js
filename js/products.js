const CART_COOKIE_NAME = "cart";

const today = new Date();
const year = today.getFullYear();
const dataYear = document.getElementById("data-year");

if (dataYear) {
  dataYear.innerText = year;
}

async function getProduct() {
  const response = await fetch("https://fakestoreapi.com/products");

  if (response.ok) {
    const jsonResponse = await response.json();

    if (jsonResponse && jsonResponse.length > 0) {
      const productListDiv = document.querySelector(".all-products");
      productListDiv.innerHTML = "";

      jsonResponse.forEach((product) => {
        productListDiv.innerHTML += `
          <div class="product">
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <div class="product-price">
              <p class="red-price">$${product.price} <span>:السعر</span></p>
            </div>
            <p class="category">Category: ${product.category}</p>
            <hr />
            <div class="product-info">
              <button class="add-to-fav" data-id="${product.id}">
                <i class="fa-regular fa-heart bttn" style="color: #835500"></i>
              </button>
              <button class="add-to-cartt" data-id="${product.id}">
                <i class="fa-solid fa-cart-shopping" style="color: #835500"></i>
              </button>  
            </div>
            <button onclick="goToDetails(${product.id})" class="product-btn">
              التفاصيل <i class="fa-solid fa-square-up-right" style="color: #ffffff;"></i>
            </button>
          </div>
        `;
      });

      // ربط زر المفضلة
      document.querySelectorAll(".add-to-fav").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.getAttribute("data-id");
          const icon = e.currentTarget.querySelector("i");
          toggleFavorite(id, icon);
        });
      });

      // ربط زر السلة
      document.querySelectorAll(".add-to-cartt").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.getAttribute("data-id");
          const product = jsonResponse.find((p) => p.id == id);
          if (product) {
            addToCart(product);
          }
        });
      });
    }
  }
}

function toggleFavorite(id, icon) {
  let favs = getCookie(FAV_COOKIE_NAME);
  let favArr = favs ? JSON.parse(favs) : [];
   
  if (favArr.includes(id)) {
    favArr = favArr.filter((item) => item !== id);
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
  } else {
    favArr.push(id);
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
  }

  setCookie(FAV_COOKIE_NAME, JSON.stringify(favArr), 7);
}

function addToCart(product) {
  let cart = getCookie(CART_COOKIE_NAME);
  let cartArr = cart ? JSON.parse(cart) : [];

  const exists = cartArr.find((item) => item.id === product.id);
  if (!exists) {
    cartArr.push(product);
    setCookie(CART_COOKIE_NAME, JSON.stringify(cartArr), 7);
    updateCartCount();
  }
}

function updateCartCount() {
  const cart = getCookie(CART_COOKIE_NAME);
  const cartArr = cart ? JSON.parse(cart) : [];
  const count = cartArr.length;

  const cartCounter = document.getElementById("count-cart");
  if (cartCounter) {
    cartCounter.innerText = count;
  }
}



function goToDetails(id) {
  location.href = `details.html?id=${id}`;
}


function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");

  for (let c of cookies) {
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(name + "=") === 0) {
      return c.substring(name.length + 1);
    }
  }

  return null;
}

document.addEventListener("DOMContentLoaded", () => {
  getProduct();
  updateCartCount();
});
