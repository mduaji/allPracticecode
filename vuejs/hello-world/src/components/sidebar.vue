<template>
  <div class="row">
  <h1>{{category}} Search</h1>
 <div class="input-group input-group-lg">
  <span class="input-group-addon glyphicon glyphicon-search" id="sizing-addon1"></span>
  <input @keyup="onKeyUp()" v-model="searchTerm" type="text" class="form-control" placeholder="Search Product Name" aria-describedby="sizing-addon1">
</div>
<br>
<button  type="button" @click="onSearch()" class="btn btn-primary">Search</button>
</div>
</template>

<script>
export default {
  data(){
    return {
      searchTerm:''
    }
  },
  props:['category']
  ,
  methods:{
   onSearch(){
     this.$emit('SearchPressd',this.searchTerm);
   },
   onKeyUp(){
      this.$emit('SearchPressd',this.searchTerm);
   }
  }
  }
</script>

<style>
</style>