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

const url1 = fetch("https://fakestoreapi.com/products");
const url2 = fetch("https://www.dbooks.org/api/recent");

const apiFunction = async function () {
  try {
    const [response1, response2] = await Promise.all([url1, url2]);
    const data = await response1.json();
    const data2 = await response2.json();
    const data3 = data2.books;
    data.forEach((products) => products_container(products));
    data3.forEach((books) => products_container_books(books));

    setTimeout(() => {
      body.style.opacity = 1;
      img.style.opacity = 0;
    }, 1000);
  } catch (error) {
    alert(error);
    console.error(error);
  }
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
