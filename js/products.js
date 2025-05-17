const today = new Date();
const year = today.getFullYear();

const dataYear = document.getElementById("data-year");
if (dataYear) {
  dataYear.innerText = year;
}

const cartBox = document.querySelector(".cart");

function open_close_cart() {
  cartBox.classList.toggle("active");
}

// تحديث عدد المنتجات في الأيقونة
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const countSpan = document.getElementById("cart-count");
  if (countSpan) {
    countSpan.innerText = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  }
}

// إضافة منتج إلى السلة
function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cartItems.find((item) => item.id === product.id);

  if (!exists) {
    product.quantity = 1; // تعيين الكمية أول مرة
    cartItems.push(product);
  } else {
    exists.quantity += 1; // زيادة الكمية إذا كان موجود
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  console.log("تمت إضافة المنتج إلى السلة:", product);
  updateCartCount();
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart_items");
  if (!cartItemsContainer) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total_Price = 0;
  let total_count = 0;

  cartItemsContainer.innerHTML = ""; // مسح القديم

  cart.forEach((item, index) => {
    let total_Price_item = item.price * item.quantity;
    total_Price += total_Price_item;
    total_count += item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="item_cart">
        <img src="${item.image}" alt="">
        <div class="content">
          <h4>${item.title}</h4>
          <p class="price_cart">$${total_Price_item.toFixed(2)}</p>
          <div class="quantity_control">
            <button class="decrease_quantity" data-index="${index}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase_quantity" data-index="${index}">+</button>
          </div>
        </div>
        <button class="delete_item" data-index="${index}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  });

  const price_cart_total = document.querySelector(".price_cart_toral");

  const count_item_cart = document.querySelector(".Count_item_cart");

  const count_item_header = document.querySelector(".count_item_header");

  price_cart_total.innerHTML = `$ ${total_Price}`;

  count_item_cart.innerHTML = total_count;

  count_item_header.innerHTML = total_count;

  // الأحداث الخاصة بالأزرار داخل السلة
  setTimeout(() => {
    document.querySelectorAll(".increase_quantity").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        changeQuantity(index, 1);
      });
    });

    document.querySelectorAll(".decrease_quantity").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        changeQuantity(index, -1);
      });
    });

    document.querySelectorAll(".delete_item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        deleteItem(index);
      });
    });
  }, 0);
}

// تعديل الكمية
function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    updateCartCount();
  }
}

// حذف منتج
function deleteItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  updateCartCount();
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
                 <button id="add-to-fav">  <i class="fa-regular fa-heart" style="color: #835500"></i></button> 

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

      // ربط أزرار الإضافة
      const addToCartBtns = document.querySelectorAll(".add-to-cartt");
      addToCartBtns.forEach((button) => {
        button.addEventListener("click", (e) => {
          const productId = Number(e.currentTarget.getAttribute("data-id"));
          const selectedProduct = jsonResponse.find((p) => p.id === productId);
          if (selectedProduct) {
            addToCart(selectedProduct);
          }
        });
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getProduct();
  updateCartCount();
  updateCart();
});
