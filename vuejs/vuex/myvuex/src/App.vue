<template>
  <div id="app">
      <product-list-one></product-list-one>
      <product-list-two></product-list-two>
  </div>
</template>

<script>
import ProductListOne from './components/productListOne'
import ProductListTwo from './components/productListTwo'
export default {
    name: 'app',
    components: {
        'product-list-one': ProductListOne,
        'product-list-two': ProductListTwo
    }
}
</script>

<style>
</style>