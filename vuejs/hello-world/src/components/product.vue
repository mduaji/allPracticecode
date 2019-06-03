<template>
<div class="container">
  <h1 class="header">{{msg}}</h1>
<hr>
<div class="col-md-3" >
<app-sidebar :category="'watch'" @SearchPressd="onSeachPressed($event)" ></app-sidebar>
</div>
<div class="col-md-9">
  <div class="row">
  <div v-for="item in arr" :key="item" class="col-sm-6 col-md-4">
    <div class="thumbnail">
      <img height="250px"  :src="item.p_img"  alt="...">
      <div class="header">
        <h3>{{item.p_name}}</h3>
        <p>{{item.p_price}}</p>
        <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
      </div>
    </div>
  </div>
</div>

</div>


</div>
</template>

<script>
export default {
data:function(){
  return {
    msg:'Product Listing',
    arr:[
      {p_id:4,p_name:"rolex",p_price:15000,p_img:"http://dvciknd2kslsk.cloudfront.net/images/watchfinderimages/Watch/Rolex/GMT-Master-II/76399-2005568029.jpg"},
      {p_id:5,p_name:"omega",p_price:5000,p_img:"http://cdn2.jomashop.com/media/catalog/product/o/m/omega-seamaster-planet-ocean-black-dial-men_s-watch-232.30.42.21.01.001_1.jpg"},
      {p_id:1,p_name:"timex",p_price:15000,p_img:"http://ecx.images-amazon.com/images/I/51Ezfl22mYL._AC_UL260_SR200,260_.jpg"},
      {p_id:2,p_name:"titan",p_price:150000,p_img:"http://ecx.images-amazon.com/images/I/51fnWFY3s3L._AC_UL260_SR200,260_.jpg"},
      {p_id:3,p_name:"fossil",p_price:5000,p_img:"https://shop.r10s.jp/hstyle/cabinet/001/027/jr1401_1.jpg"},
    ]
  }
},
methods:{
  onSeachPressed(value){
    if(value!="")
   this.arr=this.arr.filter((x)=>x.p_name.startsWith(value));
   else
  this.arr=[
      {p_id:4,p_name:"rolex",p_price:15000,p_img:"http://dvciknd2kslsk.cloudfront.net/images/watchfinderimages/Watch/Rolex/GMT-Master-II/76399-2005568029.jpg"},
      {p_id:5,p_name:"omega",p_price:5000,p_img:"http://cdn2.jomashop.com/media/catalog/product/o/m/omega-seamaster-planet-ocean-black-dial-men_s-watch-232.30.42.21.01.001_1.jpg"},
      {p_id:1,p_name:"timex",p_price:15000,p_img:"http://ecx.images-amazon.com/images/I/51Ezfl22mYL._AC_UL260_SR200,260_.jpg"},
      {p_id:2,p_name:"titan",p_price:150000,p_img:"http://ecx.images-amazon.com/images/I/51fnWFY3s3L._AC_UL260_SR200,260_.jpg"},
      {p_id:3,p_name:"fossil",p_price:5000,p_img:"https://shop.r10s.jp/hstyle/cabinet/001/027/jr1401_1.jpg"},
    ];
  }
}
}
</script>

<style>
.header{
  text-align: center;
}
</style>