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
            <th>Delete</th>
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
              <button @click="deleteHttpBinData(x.Id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <script type="x/template" id="modal-template">
  <div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            default header
          </slot>
        </div>
        
        <div class="modal-body">
          <slot name="body">
            default body
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button class="modal-default-button"
              @click="show = false">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</script>

<!-- app -->
<div id="app">
  <button id="show-modal" @click="showModal = true">Show Modal</button>
  <!-- use the modal component, pass in the prop -->
  <modal :show.sync="showModal">
    <!--
      you can use custom content here to overwrite
      default content
    -->
    <h3 slot="header">custom header</h3>
  </modal>
</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      arr: [],
      showLoader: false,
      showModal: false,   
    };
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
    },
     deleteHttpBinData: function(Id) {
      //var id = this.input.Id;
      return axios
        .delete(`http://localhost:5000/api/v1/delete/${Id}`, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          this.arr.splice(this.arr.indexOf(Id), 1);
          console.log("delete responce:" + response);
        })
        .catch(e => {
          console.log(e);
        });
    }
    
  }  
}
</script>

<style>
</style>
