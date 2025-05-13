async function getProductDetails(id) {
  const response = await fetch("https://fakestoreapi.com/products/" + id);
  //   console.log(response.status);
  if (response.ok) {
    const product = await response.json();

    if (product != null) {
      // const productTitel = document.querySelector("h3");
      // console.log(productTitel);

      const productDetailsDiv = document.querySelector(".details");
      productDetailsDiv.children[0].src = product.image; //img
      productDetailsDiv.children[0].alt = product.title; //img
      const allDesc = productDetailsDiv.children[1];
      allDesc.children[0].innerHTML = product.title; //h3
      allDesc.children[2].innerHTML = product.description; //p
      // console.log(allDesc.children[3]);
      const price = document.getElementById("price");
      price.innerHTML = product.price + "$"; //span

      const category = document.getElementById("name-category");
      category.innerHTML = product.category; //span
    }
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  const pageUrl = new URL(location.href);
  const id = pageUrl.searchParams.get("id");

  getProductDetails(id);

  setuoFavoriteBtnStatus(id);
  setuoFavoriteBtn(id);
});

function goToHomePage() {
  location.href = "../index.html";
}

function setuoFavoriteBtnStatus(id) {
  const favoriteBtn = document.querySelector("#add-to-fav");

  // <i class="fa-solid fa-heart" style="color: #ffffff;"></i>
  const favs = getCookie(FAV_COOKIE_NAME);
  let favArr = [];
  if (favs) {
    favArr = JSON.parse(favs);
  }

  if (favArr.includes(id)) {
    const btn = document.querySelector("#bttn");

   
    btn.setAttribute("class", "fa-solid fa-heart");
  } else {
    const btn = document.querySelector("#bttn");
    btn.setAttribute("class", "fa-regular fa-heart");

  }
}

function setuoFavoriteBtn(id) {
  const favoriteBtn = document.querySelector("#add-to-fav");

  favoriteBtn.addEventListener("click", (e) => {
    // <i class="fa-solid fa-heart" style="color: #ffffff;"></i>
    const favs = getCookie(FAV_COOKIE_NAME);
    let favArr = [];

    if (favs) {
      favArr = JSON.parse(favs);
    }

    if (favArr.includes(id)) {
      favArr = favArr.filter((item) => item !== id);
      const btn = document.querySelector("#bttn");
      btn.setAttribute("class", "fa-regular fa-heart");
    const btnBackground = document.querySelector("#add-to-fav");
      btnBackground.setAttribute("style", "background-color:rgb(147, 96, 0); color: #ffffff;");

   console.log(btnBackground);
      // alert("تمت إزالة المنتج من المفضلة");
    } else {
      favArr.push(id);
      const btn = document.querySelector("#bttn");
      btn.setAttribute("class", "fa-solid fa-heart");
  const btnBackground = document.querySelector("#add-to-fav");
      btnBackground.setAttribute("style", "background-color:rgb(16, 16, 15); color: #ffffff;");
      // alert("تمت إضافة المنتج إلى المفضلة");
    }
    const favsStr = JSON.stringify(favArr);

    setCookie(FAV_COOKIE_NAME, favsStr, 2);
    // countFav.innerText = favArr.length;
  });
}
