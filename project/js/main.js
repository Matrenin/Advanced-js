const products = [
    {id: 1, title: 'Notebook', price: 1000},
    {id: 2, title: 'Mouse', price: 100},
    {id: 3, title: 'Keyboard', price: 250},
    {id: 4, title: 'Gamepad', price: 150},
];

const divEl = document.querySelector(".products");

const renderProduct = (title, price, img) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить</button>
            </div>`;
};

// const renderProducts = (list) => {
//     const productList = list.map((good) => {
//         return renderProduct(good.title, good.price);
//     });
//     divEl.innerHTML = productList;

//     console.log(productList);
// };

// renderProducts(products);

const productList = products.map((good) => {
    return renderProduct(good.title, good.price, good.img);
});

divEl.insertAdjacentHTML("beforeend", productList);

// 1.
divEl.classList.add("parent-products");
document.querySelector(".btn-cart").classList.add("new-btn");
document.querySelectorAll(".product-item").forEach(el => el.classList.add("new-productItem"));
document.querySelectorAll("h3").forEach(el => el.classList.add("product-title"));
document.querySelectorAll(".products button").forEach(el => el.classList.add("product-btn"));

// 3.
const divNodes = divEl.childNodes;
divNodes.forEach(node => {
    if (node.nodeName == "#text") {
        node.remove();
    }
});