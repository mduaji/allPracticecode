<template>
  <div>
    <b-button
      :class="showCollapse ? 'collapsed' : null"
      :aria-expanded="showCollapse ? 'true' : 'false'"
      aria-controls="collapse-1"
      @click="showCollapse = !showCollapse"
    >Get Details</b-button>
    <b-collapse id="collapse-1" v-model="showCollapse" class="mt-2">
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
              <th>
                <input type="checkbox" @change="getHttpBinData($event)">
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="x in arr" :key="x.Id" v-show="showTable">
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
                <button @click="showCollapse1 = true, form = x">Edit</button>
              </td>
              <td>
                <button @click="deleteHttpBinData(x.Id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <!-- </b-form> -->
    <b-button
      :class="showCollapse1 ? 'collapsed' : null"
      :aria-expanded="showCollapse1 ? 'true' : 'false'"
      aria-controls="collapse-2"
      @click="showCollapse1 = !showCollapse1"
    >Register</b-button>
    <b-collapse id="collapse-2" v-model="showCollapse1" class="mt-2">
      <b-form class="w-25">
        <b-form-group label="Id:">
          <b-form-input
            v-model="form.Id"
            v-validate="{numeric:true,required:true}"
            placeholder="Enter Id"
            name="Id"
          ></b-form-input>
          <span>{{ errors.first('Id') }}</span>
        </b-form-group>
        <b-form-group label="Name:">
          <b-form-input
            v-model="form.Name"
            v-validate="{alpha:true,required:true}"
            placeholder="Enter name"
            name="Name"
          ></b-form-input>
          <span>{{ errors.first('Name') }}</span>
        </b-form-group>
        <b-form-group label="MobileNo:">
          <b-form-input
            v-model="form.MobileNo"
            v-validate="{numeric:true,length:10,required:true}"
            placeholder="Enter MobileNo"
            name="MobileNo"
          ></b-form-input>
          <span>{{ errors.first('MobileNo') }}</span>
        </b-form-group>
        <b-form-group label="EmailAddress:">
          <b-form-input
            v-model="form.Email"
            v-validate="{email:true,required:true}"
            type="email"
            placeholder="Enter Email"
            name="Email"
          ></b-form-input>
          <span>{{ errors.first('Email') }}</span>
        </b-form-group>
        <b-form-group label="Country:">
          <b-form-select v-model="form.Country" :options="Countries" required></b-form-select>
        </b-form-group>
        <b-form-group label="Password:">
          <b-form-input
            type="password"
            v-model="form.Password"
            v-validate="'required'"
            placeholder="Enter Password"
            name="Password"
            ref="Password"
          ></b-form-input>
          <span>{{ errors.first('Password') }}</span>
        </b-form-group>
        <b-form-group label="ConfirmPassword:">
          <b-form-input
            type="password"
            v-validate="'required|confirmed:Password'"
            v-model="form.ConfirmPassword"
            placeholder="Enter ConfirmPassword"
            name="ConfirmPassword"
          ></b-form-input>
          <span>{{ errors.first('ConfirmPassword') }}</span>
        </b-form-group>
        <b-form-group label="Color:">
          <b-form-checkbox-group v-model="form.Color">
            <b-form-checkbox value="Red">Red</b-form-checkbox>
            <b-form-checkbox value="Black">Black</b-form-checkbox>
            <b-form-checkbox value="Green">Green</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-form-group label="Gender:">
          <b-form-radio-group v-model="form.Gender">
            <b-form-radio value="Male">Male</b-form-radio>
            <b-form-radio value="Female">Female</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <button @click="postHttpBinData()" class="btn btn-primary">Submit</button>
        <button @click="putHttpBinData()" class="btn btn-primary">Update Data</button>
      </b-form>
    </b-collapse>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>-->
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showCollapse: false,
      showCollapse1: false,
      showTable: false,
      arr: [],
      form: {
        Id: "",
        Name: "",
        MobileNo: "",
        Email: "",
        Country: null,
        Password: "",
        ConfirmPassword: "",
        Color: [],
        Gender: ""
      },
      Countries: [
        { text: "Select One", value: null },
        "India",
        "China",
        "USA",
        "Singapore"
      ]
      // show: true
    };
  },
  // mounted() {
  //   this.getHttpBinData();
  // },
  methods: {
    getHttpBinData: function(event) {
      //console.log(event.target.checked);
      this.showTable = event.target.checked;
      axios({ method: "GET", url: "http://localhost:5000/api/v1/get" })
        .then(result => {
          this.arr = result.data;
          console.log(result);
        })
        .catch(e => {
          console.error(e);
        });
    },
    // getHttpBinData: false,
    postHttpBinData: function() {
      var data = {
        Id: this.form.Id,
        Name: this.form.Name,
        Email: this.form.Email,
        MobileNo: this.form.MobileNo,
        Country: this.form.Country,
        Password: this.form.Password,
        ConfirmPassword: this.form.ConfirmPassword,
        Color: this.form.Color,
        Gender: this.form.Gender
      };
      console.log(data);
      return axios
        .post("http://localhost:5000/api/v1/post", data, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          this.arr.push(this.response);
          console.log("result  :" + response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    putHttpBinData: function() {
      var Id = this.form.Id;
      var data = {
        Name: this.form.Name,
        Email: this.form.Email,
        MobileNo: this.form.MobileNo,
        Country: this.form.Country,
        Password: this.form.Password,
        ConfirmPassword: this.form.ConfirmPassword,
        Color: this.form.Color,
        Gender: this.form.Gender
      };
      console.log(data);
      return axios
        .put(`http://localhost:5000/api/v1/put/${Id}`, data, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          // this.arr = result;
          this.arr.push(this.form);
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

<style>
</style>
