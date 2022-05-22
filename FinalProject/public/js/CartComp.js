Vue.component("cart", {
    data() {
        return {
            showCart: false,
            cartItems: [],
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id === product.id);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                        }
                    });
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart/`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id}`, {quantity: -1})
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },
    computed: {
        getSumQuantity() {
            let result = this.cartItems.reduce((acc, el) => acc + el.quantity, 0);
            return result;;
        },
    },
    mounted() {
        this.$parent.getJson("/api/cart")
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div>
            <button class="cart__btn" @click="showCart = !showCart">Корзина</button>
            <span v-if="cartItems.length !== 0" class="cart-count">{{ getSumQuantity }}</span>
            <div class="cart__box" :class="{hidden: !showCart}">
                <p class="cart-empty" v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item"
                    v-for="item of cartItems"
                    :key="item.id_product"
                    :cartItem="item"
                    @remove="remove"
                ></cart-item>
                <a class="cart__box-link" v-if="cartItems.length" href="shopping.html">Перейти к оформлению</a>
            </div>
        </div>
    `
});

Vue.component("cart-item", {
    props: ["cartItem"],
    template: `
        <div class="cart-item">
            <div class="cart-left">
                <img :src="cartItem.img" alt="some img" height="100">
                <div class="cart__desc">
                    <p class="cart__desc-name">{{ cartItem.model }}</p>
                    <p class="cart__desc-quantity">{{ cartItem.quantity }}</p>
                    <p class="cart__desc-price">{{ cartItem.price }} <span>цена за единицу</span></p>
                </div>
            </div>
            <div class="cart__right">
                <p class="cart__right-price">{{ cartItem.price * cartItem.quantity }} p</p>
                <button class="cart__right-btn" @click="$emit('remove', cartItem)">&times;</button>
            </div>
        </div>
    `
});