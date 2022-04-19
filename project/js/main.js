const api = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };

class List {
    constructor(url, container, list = listContext) {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.init();
    }

    getProducts(url) {
        return fetch(url ? url : `${api + this.url}`)
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    handleData(data) {
        this.goods = data;
        this.render();
    }

    render() {
        let block = document.querySelector(this.container);
        for (let good of this.goods) {
            let productObj = null;
            if (this.constructor.name === "ProductList") {
                productObj = new ProductItem(good);
            }

            if (this.constructor.name === "Cart") {
                productObj = new CartItem(good);
            }

            if (! productObj) {
                return;
            }
            this.allProducts.push(productObj);
            block.insertAdjacentHTML("beforeend", productObj.render());
        }
    }

    init() {
        return undefined;
    }
}

class Item {
    constructor(el, img = "https://via.placeholder.com/200x150") {
        this.title = el.product_name;
        this.id = el.id_product;
        this.price = el.price;
        this.img = img;
    }

    render() {
        return ``;
    }
}

class ProductList extends List {
    constructor(cart, container = ".products", url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getProducts()
            .then(data => this.handleData(data));
    }

    init() {
        document.querySelector(this.container).addEventListener("click", event => {
            if (event.target.classList.contains("buy-btn")) {
                this.cart.addProduct(event.target);
            }
        });
    }
}

class ProductItem extends Item{
    render() {
        return `<div class="product-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button 
                    data-id="${this.id}"
                    data-name="${this.title}"
                    data-price="${this.price}"
                    class="buy-btn">Купить</button>
                  </div>
                </div>`;
    }
}

class Cart extends List {
    constructor(container = ".cart-box", url = "/getBasket.json") {
        super(url, container);
        this.getProducts()
            .then(data => {
                this.handleData(data.contents);
            });
    }

    addProduct(element) {
        this.getProducts(`${api}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset.id;
                    let find = this.allProducts.find(product => product.id === productId);
                    if (find) {
                        find.quantity++;
                        this.updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset.price,
                            product_name: element.dataset.name,
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert("Error");
                }
            });
    }

    removeProduct(element) {
        this.getProducts(`${api}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset.id;
                    let find = this.allProducts.find(product => product.id === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this.updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert("Error");
                }
            });
    }

    updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id}"]`);
        block.querySelector(".product-quantity").textContent = `Количество: ${product.quantity}`;
        block.querySelector(".product-price").textContent = `${product.quantity * product.price}`;
    }

    init() {
        document.querySelector(".btn-cart").addEventListener("click", () => {
            document.querySelector(".cart-box").classList.toggle("hidden");
        });
        document.querySelector(this.container).addEventListener("click", event => {
            if (event.target.classList.contains("del-btn")) {
                this.removeProduct(event.target);
            }
        });
    }
}

class CartItem extends Item {
    constructor(el, img = "https://via.placeholder.com/50x100") {
        super(el, img);
        this.quantity = el.quantity;
    }

    render() {
        return `
        <div class="cart-item" data-id="${this.id}">
          <div class="product-bio">
              <img src="${this.img}" alt="Some image">
              <div class="product-desc">
              <p class="product-title">${this.title}</p>
              <p class="product-quantity">Количество: ${this.quantity}</p>
              <p class="product-single-price">${this.price} за ед.</p>
          </div>
          <div class="product-right">
            <p class="product-price">${this.quantity*this.price} ₽</p>
            <button data-id="${this.id}" class="del-btn">&times;</button>
          </div>
        </div>`;
    }
}

const listContext = {
    ProductsList: ProductItem,
    Cart: CartItem
};


let cart = new Cart();
let list = new ProductList(cart);