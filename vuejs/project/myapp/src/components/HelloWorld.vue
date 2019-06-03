<template>
  <div>
    <div class="text-center">
      <b-spinner variant="primary" label="Text Centered" v-show="showLoader"></b-spinner>
    </div>
    <div v-if="display">
      <h1>Server Error While Load the Data</h1>
    </div>
    <div v-else>
      <div v-if="userer || arr.length==0">
        <h1>User Info Not Found</h1>
        <b-button variant="success" @click="pageRedirect()">Add User</b-button>
      </div>
      <div class="row" v-else>
        <div>
          <b-form-select
            size="sm"
            sm="2"
            v-model="form.selectOptions"
            :options="dropDownOptions"
            @change="change()"
          ></b-form-select>
          <div v-show="showSearch">
            <div v-if="this.form.selectOptions=='Mobile Number'">
              <b-form-input
                v-validate="'required|length:10'"
                name="mobileNo"
                v-model="form.text"
                placeholder="Enter Mobile Number"
              ></b-form-input>
              <b-button
                size="sm"
                style="float:left"
                variant="success"
                @click="getData(form.text)"
              >Search</b-button>
              <b-button size="sm" style="float:left" @click="redirectpg()">Refresh</b-button>
              <span>{{ errors.first('mobileNo') }}</span>
            </div>
            <div v-else>
              <b-form-input type="date" v-validate="'required'" v-model="form.text" name="Date"></b-form-input>
              <b-button
                size="sm"
                style="float:left"
                variant="success"
                @click="getData(form.text)"
              >Search</b-button>
              <b-button size="sm" style="float:left" @click="redirectpg()">Refresh</b-button>
              <span>{{ errors.first('Date') }}</span>
            </div>
          </div>
        </div>
        <table class="table">
          <thead v-show="showTbl">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>MobileNo</th>
              <th>Email</th>
              <th>Country</th>
              <th>Language</th>
              <th>Gender</th>
              <th>DOB</th>
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
              <td>{{x.Language}}</td>
              <td>{{x.Gender}}</td>
              <td>{{x.DOB}}</td>
              <td>
                <b-button variant="info" @click="onClick(x.Id)">Edit</b-button>
              </td>
              <td>
                <b-button v-b-modal.modal-scoped variant="dark" @click="deleteId = x.Id">Delete</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="header1">
        <b-button variant="primary" size="sm" style="float:right" @click="pageRedirect()">+</b-button>
      </div>
    </div>
    <template>
      <b-modal id="modal-scoped">
        <template slot="default">
          <p>Are you Sure,you want to delete</p>
        </template>
        <template slot="modal-footer" slot-scope="{ ok, cancel }">
          <b-button size="sm" variant="success" @click="deleteHttpBinData(deleteId)">OK</b-button>
          <b-button size="sm" variant="danger" @click="deleteId = null, cancel()">Cancel</b-button>
        </template>
      </b-modal>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      arr: [],
      showLoader: false,
      showTbl: false,
      display: false,
      userer: false,
      deleteId: null,
      showSearch: false,
      form: {
        text: "",
        selectOptions: null
      },
      dropDownOptions: [
        { text: "Select One", value: null },
        "Mobile Number",
        "DOB"
      ]
    };
  },
  mounted() {
    this.getHttpBinData();
  },
  methods: {
    getHttpBinData: function() {
      this.showLoader = true;
      this.showTbl = false;
      axios({
        method: "GET",
        url: "http://localhost:5000/api/v1/get"
      }).then(
        response => {
          this.arr = response.data;
          this.showTbl = true;
          this.showLoader = false;
          if (this.arr.length == 0) {
            this.display = false;
            this.userer = true;
          }
        },
        error => {
          // Vue.rollbar.error(err);
          this.showTbl = true;
          this.showLoader = false;
          this.display = true;
          // this.$router.push("/pagenotfound");
        }
      );
    },
    deleteHttpBinData: function(Id) {
      //console.log(Id);
      this.$bvModal.hide("modal-scoped");
      //console.log(Id);
      //var id = this.input.Id;
      return axios
        .delete(`http://localhost:5000/api/v1/delete/${Id}`, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          alert("Successfully Deleted");
          this.showTbl = true;
          //this.arr.splice(26, 1);
          //console.log(index)
          const getindex = this.arr.findIndex(Element => Element.Id == Id);
          this.arr.splice(getindex, 1);
          //this.$delete(this.arr,Id)
          console.log("delete responce:" + response);
        })
        .catch(e => {
          alert("Delete is Error");
          this.showTbl = true;
          console.log(e);
        });
    },
    cancel: function() {
      this.$bvModal.hide("modal-scoped");
    },
    pageRedirect() {
      this.$router.push(`/user/add`);
    },
    redirectpg() {
      this.$router.go();
      //this.$router.push(`/user/add`);
      console.log("called");
    },
    onClick(Id) {
      this.$router.push(`/user/edit/${Id}`);
    },
    getData: function(text) {
      console.log(this.form.selectOptions);
      if (!this.form.text) {
        return;
      } else {
        if (this.form.selectOptions == "DOB") {
          this.showBtn = true;
          this.getDateData(text);
        } else {
          this.showBtn = true;
          this.getPhnData(text);
        }
      }
    },
    getDateData: function(DOB) {
      console.log(DOB);
      //var id = this.input.Id;
      return axios
        .get(`http://localhost:5000/api/v1/getdt/${DOB}`, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          this.arr = response.data;
        })
        .catch(e => {
          alert("Date is Not Found");
          console.log(e);
        });
    },
    getPhnData: function(MobileNo) {
      //console.log(MobileNo);
      //var id = this.input.Id;
      console.log(MobileNo.length);
      if (!MobileNo.length === 10) {
        console.log("hello");
        alert("Mobile Number Length Must be 10");
      } else {
        return axios
          .get(`http://localhost:5000/api/v1/getphn/${MobileNo}`, {
            headers: {
              "Content-type": "application/json"
            }
          })
          .then(response => {
            this.arr = response.data;
          })
          .catch(e => {
            alert("Mobile Number is Not Found");
            console.log(e);
          });
      }
    },
    change: function() {
      if (this.form.selectOptions == null) {
        this.showSearch = false;
        //this.$router.push('/user')
      } else {
        this.showSearch = true;
      }
    }
  }
};
</script>

<style>
</style>


