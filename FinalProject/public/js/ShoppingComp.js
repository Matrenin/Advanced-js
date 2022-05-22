Vue.component("shop", {
    computed: {
        getSumPrice() {
            let result = this.$root.$refs.cart.cartItems.reduce((acc, el) => acc + el.price, 0);
            return result;
        },
    },
    template: `
        <div class="shop">
            <shopItem v-for="item of $root.$refs.cart.cartItems" :item="item" :key="item.id"></shopItem>
            <button class="shop__btn-buy">Оформить покупку</button>
        </div>
    `
});

Vue.component("shopItem", {
    props: ["item"],
    template: `
        <div class="shop__item">
            <div class="shop__item-left">
                <div class="shop-img">
                    <img :src="item.img" alt="some img" height="200">
                </div>
                <div class="shop__item-desc">
                    <p class="shop__item-desc-model">{{ item.model }}</p>
                    <p>{{ item.price }}p за единицу</p>
                    <p>к оплате<span class="shop__item-desc-priceCount"> {{ item.price * item.quantity }}</span>p</p>                   
                </div>
            </div>
            <div class="shop__item-right">
                <button @click="$root.$refs.cart.remove(item)">-</button>
                <span>{{item.quantity}}</span>
                <button @click="$root.$refs.cart.addProduct(item)">+</button>
            </div>
        </div>
    `
});