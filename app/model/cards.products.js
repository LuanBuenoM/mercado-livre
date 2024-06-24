import { ProductService } from "../../app/service/products.service.js";

window.onload = function () {
  let productService = new ProductService();

  productService
    .listProducts()
    .then((products) => {
      console.log(products);

      const productList = document.getElementById("product-list");

      productList.innerHTML = "";
      let cardListContent = "";

      for (let i = 0; i < products.length; i++) {
        const product = products[i];

        const numericPrice = parseFloat(
          product.product_price.replace(/[^\d.-]/g, "")
        );

        const priceParts = numericPrice.toFixed(2).split(".");
        const units = priceParts[0];
        const cents = priceParts[1];

        let card = `
              <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card">
            <div>
              <section>
                <a href="">
                  <img class="card-img-top" src="${product.product_photo}"
                    alt="${product.product_title}">
                </a>
              </section>
              <div class="card-img-top__after"></div>
            </div>
            <div class="card-body">
              <a href="${product.product_url}">
                <span class="card-body__title">${product.product_title}</span>

                <div class="reviews">
                                        <span class="reviews-score">${product.product_star_rating}</span>
                                        <span class="reviews-stars">
                                            ${getStarsHTML(product.product_star_rating)}
                                        </span>
                                        <span class="reviews-score">(${product.product_num_ratings})</span>
                                    </div>

                   <div class="product-value">
                    <span id="product-value-units">R$ ${units}</span>
                    <span id="product-value-cents">${cents}</span>
                  </div>

                <div class="shipping-conditions">
                  <span>Frete Grátis</span>
                </div>
              </a>
            </div>
          </div>
        </div>  
        `;

        cardListContent += card;
      }

      function getStarsHTML(starRating) {
        const fullStars = Math.floor(starRating);
        const halfStar = starRating % 1 >= 0.5;
        let starsHTML = "";

        for (let i = 0; i < fullStars; i++) {
          starsHTML += '<i class="bi bi-star-fill"></i>';
        }

        if (halfStar) {
          starsHTML += '<i class="bi bi-star-half"></i>';
        }

        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
          starsHTML += '<i class="bi bi-star"></i>';
        }

        return starsHTML;
      }
      /*
      function parseInt(price) {
        const [units, cents] = price.replace("R$", "").trim().split(",");
        return { units, cents };
      }*/

      productList.innerHTML = cardListContent;
    })
    .catch((error) => {
      alertfy.error("Não foi possível buscar os produtos.");
    });
};
