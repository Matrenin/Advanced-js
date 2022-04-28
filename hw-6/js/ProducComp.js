Vue.component("products", {
    data() {
        return {
            filtered: [],
            catalogUrl: "/catalogData.json",
            products: [],
            imgCatalog: "https://via.placeholder.com/200x150",
        }
    },
    methods: {
        filter(search) {
            let regexp = new RegExp(search, "i");
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});

Vue.component("product", {
    props: ["product", "img"],
    template: `
        <div class="produc-item">
            <img :src="img" alt="some img">
            <div class="desc">
                <h3>{{ product.product_name }}</h3>
                <p>{{ product.price }} ₽</p>
                <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>             
            </div>
        </div>
    `
});
