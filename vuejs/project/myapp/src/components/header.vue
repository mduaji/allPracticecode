<template>
  <div>
    <h1>DASHBOARD</h1>
    <button class="btn btn-primary" style="margin:5px" @click="onClick()" >User</button>
    <!-- <button class="btn btn-primary" style="margin:5px" @click="onAddDetails()" >AddUser</button> -->
  </div>
</template>
<script>
export default {
  data(){
    return{
    }
  },
methods:{
  onClick(){
    this.$router.push('/user');
  },
  // onAddDetails(){
  //   this.$router.push({path:`/user/add`});
  // }
}
}
</script>

<style>
</style>