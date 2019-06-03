<template>
  <div>
    <div class="row">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="x in arr" :key="x.Id">
            <td>{{x.Id}}</td>
            <td>{{x.Name}}</td>
            <td>{{x.Status}}</td>
            <td>
              <button @click="input = x">Edit</button>
            </td>
            <td>
              <button @click="deleteHttpBinData(x.Id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="form-group">
        <label for="id">Id :</label>
        <input v-model="input.Id" type="text" class="form-control" placeholder="Enter Id">
      </div>
      <div class="form-group">
        <label for="title">Name:</label>
        <input v-model="input.Name" type="text" class="form-control" placeholder="Enter Name">
      </div>
      <div class="form-group">
        <label for="title">Status:</label>
        <input v-model="input.Status" type="text" class="form-control" placeholder="Enter Status">
      </div>
      <div class="form-group">
        <button @click="postHttpBinData()" class="btn btn-primary">Add Data</button>
        <button @click="putHttpBinData(input)" class="btn btn-primary">Update Data</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      // response:"",
      arr: [],
      input: {
        Id: "",
        Name: "",
        Status: ""
      }
    };
  },
  computed: {
    doneTodosCount() {
      return this.$store.getters.doneTodos;
    }
  },
  mounted() {
    this.getHttpBinData();
  },
  methods: {
    getHttpBinData: function() {
      // console.log("Get API Data ")
      axios({ method: "GET", url: "http://localhost:5000/api/v1/get" })
        .then(result => {
          this.arr = result.data;
          console.log(result);
        })
        .catch(e => {
          console.error(e);
        });
    },
    postHttpBinData: function() {
      var data = {
        Id: this.input.Id,
        Name: this.input.Name,
        Status: this.input.Status
      };
      console.log(data);
      return axios
        .post("http://localhost:5000/api/v1/post", data, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          this.arr.push(this.input);
          console.log("result  :" + response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    putHttpBinData: function(input) {
      var id = this.input.Id;
      var data = {
        Name: this.input.Name,
        Status: this.input.Status
      };
      console.log(data);
      return axios
        .put(`http://localhost:5000/api/v1/put/${id}`, data, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          // this.arr = result;
          console.log("result  :" + response);
        })
        .catch(e => {
          console.log(e);
        });
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
};
</script>
