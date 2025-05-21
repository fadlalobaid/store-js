// const CART_COOKIE_NAME = "cart";
// const FAV_COOKIE_NAME = "favorites";

const today = new Date();
const year = today.getFullYear();
const dataYear = document.getElementById("data-year");

if (dataYear) {
  dataYear.innerText = year;
}

async function getProduct() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(
        `فشل جلب المنتجات: ${response.status} ${response.statusText}`
      );
    }

    const jsonResponse = await response.json();
    console.log("البيانات المستلمة:", jsonResponse);

    if (!jsonResponse || jsonResponse.length === 0) {
      console.warn("لا توجد منتجات في الاستجابة.");
      return;
    }

    let productListDiv = document.querySelector(".all-products");
    if (!productListDiv) {
      console.error("لم يتم العثور على العنصر .all-products في الصفحة.");
      return;
    }
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

    document.querySelectorAll(".add-to-fav").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        const icon = e.currentTarget.querySelector("i");
        toggleFavorite(id, icon);
      });
    });

    document.querySelectorAll(".add-to-cartt").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        const product = jsonResponse.find((p) => p.id == id);
        if (product) {
          let cart = getCookie(CART_COOKIE_NAME);
          let cartArr = cart ? JSON.parse(cart) : [];
          const exists = cartArr.find((item) => item.id === product.id);

          if (exists) {
            alert("المنتج مضاف إلى السلة بالفعل!");
          } else {
            addToCart(product);
            alert("تم إضافة المنتج إلى السلة!");
          }
        }
      });
    });
  } catch (error) {
    console.error("خطأ في جلب المنتجات:", error);
  }
}

function toggleFavorite(id, icon) {
  try {
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
    updateFavCount(); // تحديث عداد المفضلة
  } catch (error) {
    console.error("خطأ في تحديث المفضلة:", error);
  }
}

function addToCart(product) {
  try {
    let cart = getCookie(CART_COOKIE_NAME);
    let cartArr = cart ? JSON.parse(cart) : [];

    const exists = cartArr.find((item) => item.id === product.id);
    if (!exists) {
      cartArr.push(product);
      setCookie(CART_COOKIE_NAME, JSON.stringify(cartArr), 7);
      updateCartCount();
    }
  } catch (error) {
    console.error("خطأ في إضافة المنتج إلى السلة:", error);
  }
}

function updateCartCount() {
  try {
    const cart = getCookie(CART_COOKIE_NAME);
    const cartArr = cart ? JSON.parse(cart) : [];
    const count = cartArr.length;

    const cartCounter = document.getElementById("count-cart");
    if (cartCounter) {
      cartCounter.innerText = count;
    }
  } catch (error) {
    console.error("خطأ في تحديث عداد السلة:", error);
  }
}

function updateFavCount() {
  try {
    const favs = getCookie(FAV_COOKIE_NAME);
    const favArr = favs ? JSON.parse(favs) : [];
    const favCount = document.getElementById("count-fav");
    if (favCount) {
      favCount.innerText = favArr.length;
    }
  } catch (error) {
    console.error("خطأ في تحديث عداد المفضلة:", error);
  }
}


function goToDetails(id) {
  location.href = `details.html?id=${id}`;
}

function setCookie(name, value, days) {
  try {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  } catch (error) {
    console.error("خطأ في تعيين الكوكيز:", error);
  }
}

function getCookie(name) {
  try {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");

    for (let c of cookies) {
      while (c.charAt(0) === " ") c = c.substring(1);
      if (c.indexOf(name + "=") === 0) {
        return c.substring(name.length + 1);
      }
    }
    return null;
  } catch (error) {
    console.error("خطأ في قراءة الكوكيز:", error);
    return null;
  }
}
function handleLogout() {
  try {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    updateUsernameDisplay(); 
    window.location.href = "login.html";
  } catch (error) {
    console.error("خطأ في تسجيل الخروج:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getProduct();
  updateCartCount();
  updateFavCount();
  updateUsernameDisplay(); 
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  } else {
    console.warn("لم يتم العثور على زر تسجيل الخروج #logout-btn في الصفحة.");
  }
});
