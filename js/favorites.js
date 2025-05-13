
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
console.log(favs);

  const response = await fetch("https://fakestoreapi.com/products/" + id);
  //   console.log(response.status);
  if (response.ok) {
    const product = await response.json();

    if (product != null) {
      // const productTitel = document.querySelector("h3");
      // console.log(productTitel);

      const productDetailsDiv = document.querySelector(".row");
    const imagee = document.querySelector(".imagee");
    imagee.src = product.image;
    imagee.alt = product.title;
    

    }
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  const pageUrl = new URL(location.href);
  const id = pageUrl.searchParams.get("id");

  getProductDetails(id);


});
