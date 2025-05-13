async function getProductDetails(id) {
  const response = await fetch("https://fakestoreapi.com/products/" + id);
  //   console.log(response.status);
  if (response.ok) {
    const product = await response.json();
    console.log(product);
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
      price.innerHTML = product.price +"$"; //span

      

      const category = document.getElementById("name-category");
      category.innerHTML = product.category; //span
      console.log(category);
      


    }
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  const pageUrl = new URL(location.href);
  const id = pageUrl.searchParams.get("id");
  getProductDetails(id);
});

function goToHomePage() {
  location.href = "../index.html";
}