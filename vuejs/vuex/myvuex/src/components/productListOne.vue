<template>
    <div id="product-list-one">
        <h2>Product List One</h2>
        <ul>
            <li v-for="product in saleProducts" :key="product.price">
                <span class="name">{{ product.name }}</span>
                <span class="price">£{{ product.price }}</span>
            </li>
        </ul>
        <button v-on:click="reducePrice">Reduce Price</button>
    </div>
</template>

<script>
export default {
    computed: {
        products(){
            return this.$store.state.products
        },
         saleProducts(){
            return this.$store.getters.saleProducts
        }
    },
     methods: {
        reducePrice: function(){
            /* this.$store.state.products.forEach( product => {
                product.price -= 1
            }); */
            this.$store.commit('reducePrice');
        }
    }
}
</script>

<style scoped>

</style>