<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>EmpId</th>
          <th>Role</th>
          <th>Pre Organization</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in arr" :key="index">
          <td>
            <b-form-input
              v-validate="'required|alpha'"
              :class="[{ error_input: errors.has('Name'+index)}]"
              v-model="item.Name"
              placeholder="Enter Name"
              :name="'Name'+index"
              class="w-100"
            ></b-form-input>
            <span>{{ errors.first('Name'+index) }}</span>
          </td>
          <td>
            <b-form-input
              v-validate="'required|numeric'"
              :class="[{ error_input: errors.has('EmpId'+index)}]"
              v-model="item.EmpId"
              placeholder="Enter EmpId"
              :name="'EmpId' +index"
            ></b-form-input>
            <span class="alert-danger">{{ errors.first('EmpId'+index) }}</span>
          </td>
          <td>
            <b-form-input
              v-validate="'required|alpha'"
              :class="[{ error_input: errors.has('Role'+index)}]"
              v-model="item.Role"
              placeholder="Enter Role"
              :name="'Role'+index"
            ></b-form-input>
            <span class="alert-danger">{{ errors.first('Role'+index) }}</span>
          </td>
          <td>
            <b-form-input
              v-validate="'required|alpha'"
              :class="[{ error_input: errors.has('PreOrganization'+index)}]"
              v-model="item.PreOrganization"
              placeholder="Enter PreOrganization"
              :name="'PreOrganization'+index"
            ></b-form-input>
            <span class="alert-danger">{{ errors.first('PreOrganization'+index) }}</span>
          </td>
          <td v-if="index + 1 === arr.length">
            <b-button variant="info" @click="addLine(item)">+</b-button>
          </td>
          <td v-else>
            <b-button variant="info" @click="removeData(index)">-</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <b-button style="float:centre" variant="info" @click="postData()">Submit</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      arr: [],
      form: {
        Name: "",
        EmpId: "",
        Role: "",
        PreOrganization: ""
      }
    };
  },
  mounted() {
    this.addLine();
  },
  methods: {
    postData: function() {
      var res = this.arr.filter(
        val =>
          val !== undefined &&
          val.EmpId !== "" &&
          val.Name !== "" &&
          val.Role !== "" &&
          val.PreOrganization !== ""
      );
      const param = { data: res };
      console.log(param);
      return axios
        .post("http://localhost:5000/api/v1/post", param.data, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          console.log("result  :" + response);
          this.$router.go(-1);
          this.$router.push("/User/List");
        })
        .catch(e => {
          if (e.response.data.errno == 1062) {
            alert(e.response.data.sqlMessage);
          } else {
            alert(e.response.data.Error.details[0].message);
            //console.log(e.response);
          }
        });
    },
    addLine: function(value) {
      if (
        value === undefined ||
        (!value.EmpId &&
          !value.Name &&
          !value.Role &&
          !value.PreOrganization) ||
        (value.EmpId && value.Name && value.Role && value.PreOrganization)
      ) {
        this.arr.push({
          Name: "",
          EmpId: "",
          Role: "",
          PreOrganization: ""
        });
      } else {
        // this.$validator
        //   .validateAll()
        //   .then(result => {
        //     if (!result) {
        //       alert("error Enter the All Details");
        //       // return;
        //     }
        //     // alert("success");
        //   })
        //   .catch(() => {});
        alert("Error Enter The All Detail");
      }
    },
    removeData: function(index) {
      this.arr.splice(index, 1);
    }
  }
};
</script>

<style>
.alert-danger {
  color: red;
}
.error_input {
  border-color: red;
}
</style>
