<template>
  <div>
    <b-container fluid>
      <!-- <b-form-group label="Id:">
        <b-form-input
          v-model="form.Id"
          v-validate="{numeric:true,required:true}"
          placeholder="Enter Id"
          name="Id"
        ></b-form-input>
        <span>{{ errors.first('Id') }}</span>
      </b-form-group>-->
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Name :</label>
        </b-col>
        <b-col sm="5">
          <b-form-input
            v-model="form.Name"
            v-validate="{alpha:true,required:true}"
            placeholder="Enter name"
            name="Name"
          ></b-form-input>
          <span>{{ errors.first('Name') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">MobileNo:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input
            v-model="form.MobileNo"
            v-validate="{required:true,numeric:true,length:10}"
            placeholder="Enter MobileNo"
            name="MobileNo"
          ></b-form-input>
          <span>{{ errors.first('MobileNo') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Email:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input
            v-model="form.Email"
            v-validate="'required|email'"
            type="email"
            placeholder="Enter Email"
            name="Email"
          ></b-form-input>
          <span>{{ errors.first('Email') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Country:</label>
        </b-col>
        <b-col sm="5">
          <b-form-select
            v-model="form.Country"
            :options="Countries"
            v-validate="'required'"
            name="Country"
          ></b-form-select>
          <span>{{ errors.first('Country') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Password:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input
            type="password"
            v-model="form.Password"
            v-validate="'required'"
            placeholder="Enter Password"
            name="Password"
            ref="Password"
          ></b-form-input>
          <span>{{ errors.first('Password') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">ConfirmPassword:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input
            type="password"
            v-validate="'required|confirmed:Password'"
            v-model="form.ConfirmPassword"
            placeholder="Enter ConfirmPassword"
            name="ConfirmPassword"
          ></b-form-input>
          <span>{{ errors.first('ConfirmPassword') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Language:</label>
        </b-col>
        <b-col sm="5">
          <b-form-checkbox-group v-model="form.Language" v-validate="'required'" name="Language">
            <b-form-checkbox value="Tamil">Tamil</b-form-checkbox>
            <b-form-checkbox value="Hindi">Hindi</b-form-checkbox>
            <b-form-checkbox value="English">English</b-form-checkbox>
          </b-form-checkbox-group>
          <span>{{ errors.first('Language') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Gender:</label>
        </b-col>
        <b-col sm="5">
          <b-form-radio-group v-model="form.Gender" v-validate="'required'" name="Gender">
            <b-form-radio value="Male">Male</b-form-radio>
            <b-form-radio value="Female">Female</b-form-radio>
          </b-form-radio-group>
          <span>{{ errors.first('Gender') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">DOB:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input
            type="date"
            v-validate="'required'"
            v-model="form.DOB"
            placeholder="Enter DOB"
            name="DOB"
          ></b-form-input>
          <span>{{ errors.first('DOB') }}</span>
        </b-col>
      </b-row>
      <button variant="success" @click="postHttpBinData()" class="btn btn-primary">Submit</button>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        //Id: "",
        Name: "",
        MobileNo: "",
        Email: "",
        Country: null,
        Password: "",
        ConfirmPassword: "",
        Language: [],
        Gender: "",
        DOB:""
      },
      Countries: [
        { text: "Select One", value: null },
        "India",
        "China",
        "USA",
        "Singapore"
      ]
    };
  },
  methods: {
    postHttpBinData: function() {
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) {
            //alert("error Enter the All Details");
            return;
          }
          // alert("success");
        })
        .catch(() => {});
      var data = {
        //Id: this.form.id,
        Name: this.form.Name,
        Email: this.form.Email,
        MobileNo: this.form.MobileNo,
        Country: this.form.Country,
        Password: this.form.Password,
        ConfirmPassword: this.form.ConfirmPassword,
        Language: this.form.Language,
        Gender: this.form.Gender,
        DOB:this.form.DOB
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
          //console.log("result  :" + response);
          this.$router.go(-1);
          this.$router.push(`/user`);
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
