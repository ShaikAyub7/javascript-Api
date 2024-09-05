"use strict";
const header_img = document.querySelector(".header-img");
const btn_right = document.querySelector(".btn-right");
const btn_left = document.querySelector(".btn-left");
const product_conatiner = document.querySelector(".products-container");
const product_conatiner_book = document.querySelector(
  ".products-container-books"
);
const img = document.querySelector(".img");
const body = document.querySelector(".main");

let index = 1;
const max = 5;

console.log(header_img.src);
btn_right.addEventListener("click", function () {
  if (index < max) {
    index++;
  } else {
    index = 1;
  }
  header_img.src = `img/image-${index}.jpg`;
  console.log(header_img.src);
});
btn_left.addEventListener("click", function () {
  if (index > 1) {
    index--;
  } else {
    index = max;
  }
  header_img.src = `img/image-${index}.jpg`;
  console.log(header_img.src);
});

const apiFunction = async function () {
  const response = await fetch("https://fakestoreapi.com/products");

  const data = await response.json();
  setTimeout(() => {
    body.style.opacity = 1;
    img.style.opacity = 0;
  }, 1000);

  data.forEach((products) => products_container(products));
};
apiFunction();
// window.addEventListener("load", apiFunction);

function products_container(product) {
  const html = `
  
    <div class="product-card">
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p>Category: ${product.category}</p>
      <p class="price">Price: $${product.price}</p>

    </div>
    `;

  product_conatiner.insertAdjacentHTML("afterbegin", html);
}
const booksApi = async function () {
  const response = await fetch("https://www.dbooks.org/api/recent");

  const data = await response.json();
  console.log(data);
  const allData = data.books;

  allData.forEach((products) => products_container_books(products));
};
booksApi();

function products_container_books(book) {
  const html = `
  
    <div class="product-card">
      <img src="${book.image}" alt="${book.title}"  loading="lazy">
      <h2>${book.title}</h2>
      <small>${book.subtitle}</small>
      <p><strong>Author</strong>: ${book.authors}</p>
  

    </div>`;

  product_conatiner_book.insertAdjacentHTML("afterbegin", html);
}
