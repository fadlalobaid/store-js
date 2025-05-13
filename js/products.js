function goToDetails(id){
location.href="../details.html?id= "+id
}
async function getProduct() {
  const response = await fetch("https://fakestoreapi.com/products");
  //   console.log(response.status);
  if (response.ok) {
    const jsonResponse = await response.json();
    if (jsonResponse != null && jsonResponse.length > 0) {
      const productListDiv = document.querySelector(".all-products");
      jsonResponse.forEach((product) => {
        productListDiv.innerHTML += `
           <div class="product" >
            
              <img src="${product.image}" alt="${product.title}" />
              <h3>${product.title}</h3>
              <div class="product-price">
                <div> 
                <p class="red-price">$${product.price}  <span>:السعر</span> </p>
                </div> 
              </div>
                 <p class="category">Category:${product.category}</p>
              <hr />
              <div class="product-info">
              
            <button id="add-to-fav">  <i class="fa-regular fa-heart" style="color: #835500"></i></button> 
           <button>  <i class="fa-solid fa-cart-shopping" style="color: #835500"></i></button>  


             
              </div>
              <button onClick="goToDetails(${product.id})" class="product-btn">التفاصيل<i class="fa-solid fa-square-up-right" style="color: #ffffff;"></i></button>
            </div>
        `;
      });
    }
  }
}
document.addEventListener("DOMContentLoaded", (e) => {
  getProduct();
});


