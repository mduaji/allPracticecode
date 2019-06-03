<template>
  <div>
    <div id="app">
      <b-spinner ref="Spinner" v-show="showLoader"></b-spinner>
    </div>
    <div class="row">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>MobileNo</th>
            <th>Email</th>
            <th>Country</th>
            <th>Password</th>
            <th>ConfirmPassword</th>
            <th>Color</th>
            <th>Gender</th>
            <th>Edit</th>
            <!-- <th>Delete</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="x in arr" :key="x.Id">
            <td>{{x.Id}}</td>
            <td>{{x.Name}}</td>
            <td>{{x.MobileNo}}</td>
            <td>{{x.Email}}</td>
            <td>{{x.Country}}</td>
            <td>{{x.Password}}</td>
            <td>{{x.ConfirmPassword}}</td>
            <td>{{x.Color}}</td>
            <td>{{x.Gender}}</td>
            <td>
              <button @click="form = x">Edit</button>
            </td>
            <td>
              <!-- <button @click="deleteHttpBinData(x.Id)">Delete</button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      arr: [],
      showLoader: false    
    };
    // this.$refs.Spinner.hide();
  },
  mounted() {
    this.getHttpBinData();
  },
  methods: {
    getHttpBinData: function() {
      this.showLoader = true
      axios({
        method: "GET",
        url: "http://localhost:5000/api/v1/get"
      }).then(
        response => {
          this.arr = response.data;
          console.log(response);
          this.showLoader = false
        },
        error => {
         Vue.rollbar.error(err);
         this.showLoader = false
        }
      );
    }
  }
};
</script>

<style>
</style>
