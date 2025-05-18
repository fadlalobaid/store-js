async function getProductDetails(id) {
  const favs = getCookie(FAV_COOKIE_NAME);
  let favArr = [];

  try {
    if (favs) {
      favArr = JSON.parse(favs);
    }
  } catch (error) {
    console.error("Error parsing favorites cookie:", error);
  }


  function updateCartCount() {
    const cart = localStorage.getItem("cart");
    const cartArr = cart ? JSON.parse(cart) : [];
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.innerText = cartArr.length;
    }
  }


  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) throw new Error("Failed to fetch products");

    let products = await response.json();

    // تصفية المنتجات بناءً على الـ ID المحفوظ في الكوكيز
    const filteredProducts = products.filter((el) =>
      favArr.includes(el.id.toString())
    );

    if (filteredProducts.length > 0) {
      const productListDiv = document.querySelector(".col");

      filteredProducts.forEach((product) => {
        productListDiv.innerHTML += `
          <div class="trr row mb-3 p-2 border rounded bg-light">
            <div class="col-md-3 align-self-center">
              <img src="${product.image}" alt="${product.title}" class="imagee img-fluid"/>
            </div>
            <div class="col-md-6 align-self-center">
              <h3>${product.title}</h3>
            </div>
            <div class="col-md-3 align-self-center text-end">
              <span class="fw-bold">${product.price}$</span>
            </div>
          </div>
        `;
      });
    } else {
      console.log("لا توجد منتجات مفضلة.");
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب المنتجات:", error);
  }
}

// تنفيذ عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {

  const pageUrl = new URL(location.href);
  const id = pageUrl.searchParams.get("id");

  getProductDetails(id);
});
document.getElementById("clear-fav").addEventListener("click", () => {
  setCookie(FAV_COOKIE_NAME, "", -1);

  const countFav = document.querySelector("#count-fav");
  if (countFav) {
    countFav.innerText = "0";
  }

  const productListDiv = document.querySelector(".col");
  if (productListDiv) {
    productListDiv.innerHTML = "<p>لا توجد منتجات في المفضلة.</p>";
  }

 

   updateCartCount();
});

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
