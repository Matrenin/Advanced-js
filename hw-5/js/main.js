const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: "#app",
    data: {
        showCart: false,
        cartUrl: "/getBasket.json",
        listUrl: "/catalogData.json",
        products: [],
        cartItems: [],
        filtered: [],
        imgCatalog: "https://via.placeholder.com/200x150",
        imgCart: "https://via.placeholder.com/50x100",
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(response => response.json())
                .catch(err => console.log(err));
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    } else {
                        alert("Error");
                    }
                });
        },
        remove(item) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                });
        }
    },
    beforeCreate() {
        console.log("beforeCreate");
    },
    created(){
        console.log("created");
    },
    beforeMount() {
        console.log("beforeMount");
    },
    mounted() {
    this.getJson(`${API + this.cartUrl}`)
        .then(data => {
        for (let el of data.contents) {
            this.cartItems.push(el);
        }
        });
    this.getJson(`${API + this.listUrl}`)
        .then(data => {
        for (let el of data) {
            this.products.push(el);
            this.filtered.push(el);
        }
        });
    },
    beforeUpdate() {
        console.log("beforeUpdate");
    },
    updated() {
        console.log("updated");
    },
    beforeDestroy() {
        console.log("beforeDestroy");
    },
    destroyed() {
        console.log("destroyed");
    },
});

