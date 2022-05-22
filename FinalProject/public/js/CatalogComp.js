Vue.component("catalog", {
    data() {
        return {
            allContents: [],
        }
    },
    mounted() {
        this.$parent.getJson("/api/products")
            .then(data => {
                for (let el of data) {
                    this.allContents.push(el);
                }
            });
    },
    template: `
        <div class="catalog">
            <catalogItem 
                v-for="item of allContents"
                :key="item.id"
                :item="item"
            ></catalogItem>
        </div>
    `
});

Vue.component("catalogItem", {
    props: ["item"],
    template: `
        <div class="catalog__item">
            <div class="catalog__item-img">
                <img :src="item.img" alt="some img" height="300">
            </div>
            <div class="catalog__item-desc">
                <p>Модель: <span>{{ item.model }}</span></p>
                <p>Цена: <span>{{ item.price }}</span> p</p>
                <p>Производитель: <span>{{ item.counrty }}</span></p>
                <p>Типа пленк: <span>{{ item.film }}</span></p>
                <p>Год выпуска: <span>{{ item.year }}</span></p>
                <button @click="$root.$refs.cart.addProduct(item)">Купить</button>
            </div>
        </div>
    `
});