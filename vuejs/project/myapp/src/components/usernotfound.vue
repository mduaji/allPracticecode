<template>
  <div class="container">
    <h1>User Not Found</h1>
    <h1>404</h1>
    <b-button @click="onClick()">Add</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    onClick: function() {
      this.$router.push("/user/add");
    }
  }
};
</script>

<style>
</style>