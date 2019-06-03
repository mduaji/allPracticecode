<template>
  <div>
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Name</label>
          <b-form-input v-model="Name" placeholder="Enter Name" name="Name"></b-form-input>
        </b-col>
        <b-col sm="2">
          <label for="input-default">EpmId</label>
          <b-form-input v-model="EpmId" placeholder="Enter EpmId" name="EpmId"></b-form-input>
        </b-col>
        <b-col sm="2">
          <label for="input-default">Role</label>
          <b-form-input v-model="Role" placeholder="Enter Role" name="Role"></b-form-input>
        </b-col>
        <b-col sm="2">
          <label for="input-default">PreOrganization</label>
          <b-form-input
            v-model="PreOrganization"
            placeholder="Enter PreOrganization"
            name="PreOrganization"
          ></b-form-input>
        </b-col>
        <b-button @click="postData()">+</b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      arr: [],
      form: {
        Name: "",
        EpmId: "",
        Role: "",
        PreOrganization: ""
      }
    };
  },
  methods:{
    postData:function(){
      var data = {
        Name: this.Name,
        EpmId:this.EpmId,
        Role:this.Role,
        PreOrgination:this.PreOrganization
      };
      console.log(data);
      return axios
        .post("http://localhost:5000/api/v1/post", data, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          // this.arr.push(this.response);
          console.log("result  :" + response);
        })
        .catch(e => {
          console.log(e);
        });
    }
    }
};
</script>

<style>
</style>
