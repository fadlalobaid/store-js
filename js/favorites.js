// const FAV_COOKIE_NAME = "favs";
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

let countFav=document.querySelector("#count-fav");
countFav.innerText = favArr.length;


    const response = await fetch("https://fakestoreapi.com/products");
  if (response.ok) {
    let jsonResponse = await response.json();
    jsonResponse=jsonResponse.filter((el)=>(favArr.includes(el.id.toString())));

    
    if (jsonResponse != null && jsonResponse.length > 0) {
      const productListDiv = document.querySelector(".row");
    
      
      jsonResponse.forEach((product) => {
        productListDiv.innerHTML += `
                <div class="col">
                  <img src="${product.image}" alt="${product.title}" width="100" class="imagee"/>
                </div>
                <div class="col align-self-center">
                  <h3>${product.title}</h3>
                </div>
                <div class="col align-self-center">
                  <span>${product.price}</span>
                </div>
          
        `;
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  const pageUrl = new URL(location.href);
  const id = pageUrl.searchParams.get("id");
  
  getProductDetails(id);
});
