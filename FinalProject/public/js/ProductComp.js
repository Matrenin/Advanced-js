Vue.component("products",{
    data() {
        return {
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(search) {
            let regexp = new RegExp(search, "i");
            this.filtered = this.products.filter(el => regexp.test(el.model));
        },
    },
    mounted() {
        this.$parent.getJson("/api/products")
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" class="product" :product="item"></product>
        </div>
    `
});


Vue.component("product", {
    props: ["product"],
    template: `
        <div>
            <div class="product__img">
                <img :src="product.img" alt="some img">
            </div>
            <div class="desc">
                <p class="product-name">{{ product.model }}</p>
                <p class="product-price">{{ product.price }} p</p>
                <button @click="$root.$refs.cart.addProduct(product)" class="buy-btn">Купить</button>
            </div>
        </div>
    `
});