"use strict";
const header_img = document.querySelector(".header-img");
const btn_right = document.querySelector(".btn-right");
const btn_left = document.querySelector(".btn-left");
// const li = document.querySelector(".li");
const nav = document.querySelector(".navbar");
const main = document.querySelector("body");
const product_conatiner = document.querySelector(".products-container");
const product_conatiner_book = document.querySelector(
  ".products-container-books"
);
const product_conatiner_beauty = document.querySelector(
  ".products-container-beauty"
);
const darkBtn = document.querySelector(".dark-btn");

const img = document.querySelector(".img");
const body = document.querySelector(".main");
const section = document.querySelectorAll(".section");

let index = 1;
const max = 3;

console.log(header_img.src);
btn_right.addEventListener("click", function () {
  if (index < max) {
    index++;
  } else {
    index = 1;
  }
  header_img.src = `img/image--${index}.jpeg`;
  console.log(header_img.src);
});
btn_left.addEventListener("click", function () {
  if (index > 1) {
    index--;
  } else {
    index = max;
  }
  header_img.src = `img/image--${index}.jpeg`;
  console.log(header_img.src);
});

const url1 = fetch("https://fakestoreapi.com/products");
const url2 = fetch("https://www.dbooks.org/api/recent");
const url3 = fetch("https://dummyjson.com/products");

const apiFunction = async function () {
  try {
    const [response1, response2, response3] = await Promise.all([
      url1,
      url2,
      url3,
    ]);
    const data = await response1.json();
    const data2 = await response2.json();
    const data3 = await response3.json();
    const allBooks = data2.books;
    const allProducts = data3.products;
    // console.log(data3.products);
    data.forEach((products) => products_container(products));
    allBooks.forEach((books) => products_container_books(books));
    allProducts.forEach((beauty) => products_container_beauty(beauty));

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

function products_container(product) {
  const html = `
    <div class="product-card card">
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
    <div class="product-card card">
      <img src="${book.image}" alt="${book.title}"  loading="lazy">
      <h2>${book.title}</h2>
      <small>${book.subtitle}</small>
      <p><strong>Author</strong>: ${book.authors}</p>
    </div>`;

  product_conatiner_book.insertAdjacentHTML("afterbegin", html);
}

function products_container_beauty(beauty) {
  const html = `
    <div class="product-card card">
      <img src="${beauty.images}" alt="${beauty.title}"  loading="lazy">
     <h3 class="price">${beauty.title}</h3>
      <p>${beauty.warrantyInformation}</p>
      <p>Weight : ${beauty.weight}kg</p>
      <p><strong>category</strong>: ${beauty.category}</p>
      <p><strong>availabilityStatus
</strong>: ${beauty.availabilityStatus}</p>
   <p class="price">Price: $${beauty.price}</p>
    </div>`;

  product_conatiner_beauty.insertAdjacentHTML("afterbegin", html);
}

darkBtn.addEventListener("click", function (e) {
  section.forEach((sec) => {
    sec.classList.toggle("dark-mode");
  });
  main.classList.toggle("dark-mode");
  nav.classList.toggle("dark-mode");

  console.log(sec);
});
