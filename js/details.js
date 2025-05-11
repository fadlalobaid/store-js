async function getProductDetails(id) {
  const response = await fetch("https://fakestoreapi.com/products/"+id);
  //   console.log(response.status);
  if (response.ok) {
    const product = await response.json();
    if (product != null ) {
      const productDetailsDiv = document.querySelector(".details");
      product.forEach((product) => {
        productDetailsDiv.innerHTML += `
         
        `;
      });
      console.log(productDetailsDiv);
      
    }
  }
}

document.addEventListener('DOMContentLoaded',e=>{
    const pageUrl= new URL(location.href)
    const id =pageUrl.searchParams.get("id")
     getProductDetails(id)
})