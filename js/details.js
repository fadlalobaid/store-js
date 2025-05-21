document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id) {
    getProductDetails(id);
    setupFavoriteBtnStatus(id);
    setupFavoriteBtn(id);
  } else {
    const alert = document.getElementById("alert");
    alert.classList.add("alert");
    alert.classList.add("alert-danger");
    alert.innerHTML = `
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      لم يتم العثور على المنتج
    `;
  }
});

async function getProductDetails(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (response.ok) {
    const product = await response.json();

    if (product != null) {
      const productDetailsDiv = document.querySelector(".details");

      productDetailsDiv.children[0].src = product.image;
      productDetailsDiv.children[0].alt = product.title;

      const allDesc = productDetailsDiv.children[1];
      allDesc.children[0].innerHTML = product.title;
      allDesc.children[2].innerHTML = product.description;

      const price = document.getElementById("price");
      price.innerHTML = `${product.price}$`;

      const category = document.getElementById("name-category");
      category.innerHTML = product.category;
    }
    if (product != null) {
      setupAddToCartBtn(product.id, product);
    }
  } else {
    console.error("فشل في جلب بيانات المنتج.");
  }
}

function goToHomePage() {
  const basePath = window.location.pathname.substring(
    0,
    window.location.pathname.lastIndexOf("/") + 1
  );
  window.location.href = `${basePath}index.html`;
}

function setupFavoriteBtnStatus(id) {
  const favs = getCookie(FAV_COOKIE_NAME);
  let favArr = favs ? JSON.parse(favs) : [];

  const btn = document.querySelector("#bttn");

  if (favArr.includes(id)) {
    btn.setAttribute("class", "fa-solid fa-heart");
  } else {
    btn.setAttribute("class", "fa-regular fa-heart");
  }
}

function setupFavoriteBtn(id) {
  const favoriteBtn = document.querySelector("#add-to-fav");

  favoriteBtn.addEventListener("click", () => {
    const favs = getCookie(FAV_COOKIE_NAME);
    let favArr = favs ? JSON.parse(favs) : [];

    const btn = document.querySelector("#bttn");
    const btnBackground = document.querySelector("#add-to-fav");

    if (favArr.includes(id)) {
      favArr = favArr.filter((item) => item !== id);
      btn.setAttribute("class", "fa-regular fa-heart");
      btnBackground.setAttribute(
        "style",
        "background-color:rgb(147, 96, 0); color: #ffffff;"
      );
    } else {
      favArr.push(id);
      btn.setAttribute("class", "fa-solid fa-heart");
      btnBackground.setAttribute(
        "style",
        "background-color:rgb(16, 16, 15); color: #ffffff;"
      );
    }

    const favsStr = JSON.stringify(favArr);
    setCookie(FAV_COOKIE_NAME, favsStr, 2);
  });
}

function setupAddToCartBtn(id, product) {
  const cartBtn = document.getElementById("add-to-cart");

  if (!cartBtn) return;

  cartBtn.addEventListener("click", () => {
    let cart = localStorage.getItem("cart");
    let cartArr = cart ? JSON.parse(cart) : [];

    const exists = cartArr.some((item) => item.id === product.id);
    if (!exists) {
      cartArr.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });

      localStorage.setItem("cart", JSON.stringify(cartArr));
      const alert = document.getElementById("alert");
      alert.classList.add("alert");
      alert.classList.add("alert-success");

      alert.innerHTML = `  
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>  
      تم اضافة المنتج الى السلة بنجاح  
         
                 `;
    } else {
      const alert = document.getElementById("alert");
      alert.classList.add("alert");
      alert.classList.add("alert-info");

      alert.innerHTML = `
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      المنتج مضاف مسبقاً             
      
`;
    }
  });
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
updateFavCount();
