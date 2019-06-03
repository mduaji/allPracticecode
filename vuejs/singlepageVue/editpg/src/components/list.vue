<template>
  <div class="main">
    <b-container fluid class="bv-example-head">
      <!-- <b-row>
        <h5>{{"No of Employees : "+ UserCount}}</h5>
      </b-row> -->
      <div class="text-center">
        <h1>Vue Dashboard</h1>
        <b-button variant="success" @click="getData()">View Details</b-button>
      </div>
    </b-container>
    <b-container class="bv-table-row-col">
      <div v-if="display">
        <h2>Employee Details Not Found</h2>
        <b-button style="float:centre" variant="info" @click="redirect()">+</b-button>
      </div>
      <div v-else>
        <div class="row" v-show="showTbl">
          <div>
            <b-button
              style="float:centre"
              variant="info"
              v-show="seletAlbtn"
              @click="ShowCheck"
            >SelectItem</b-button>
            <b-button
              style="float:centre"
              variant="info"
              v-show="dtlAll"
              v-b-modal.modal-scoped
            >Delete</b-button>
          </div>
          <div>
            <b-button style="float:centre" variant="info" v-show="addBtn" @click="redirect()">+</b-button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>
                  <b-form-checkbox v-show="thCheckBox" v-model="selectAll"></b-form-checkbox>
                </th>
                <th>Name</th>
                <th>EmpId</th>
                <th>Role</th>
                <th>Pre Organization</th>
                <th v-show="dltth">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="x in arr" :key="x.EmpId">
                <td>
                  <b-form-checkbox v-show="showCheck" :value="x.EmpId" v-model="checkedNames"></b-form-checkbox>
                </td>
                <td>{{x.Name}}</td>
                <td>{{x.EmpId}}</td>
                <td>{{x.Role}}</td>
                <td>{{x.PreOrganization}}</td>
                <td>
                  <b-button v-show="dtldtn" @click="deleteData(x.EmpId)" variant="danger">
                    <i class="fa fa-trash">-</i>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="text-center" v-if="showLoader">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
      </div>
    </b-container>
    <template>
      <b-modal id="modal-scoped">
        <template slot="default">
          <p>Are you Sure,you want to delete</p>
        </template>
        <template slot="modal-footer">
          <b-button size="sm" variant="success" @click="deleteAll()">OK</b-button>
          <b-button size="sm" variant="danger" @click="checkedNames=[],cancel()">Cancel</b-button>
        </template>
      </b-modal>
    </template>
  </div>
</template>
<script>
import axios from "axios";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      UserCount: "",
      arr: [],
      display: false,
      showTbl: false,
      showLoader: false,
      checkedNames: [],
      showCheck: false,
      dtldtn: true,
      dtlAll: false,
      addBtn: true,
      dltth: true,
      thCheckBox: false,
      seletAlbtn: true
    };
  },
  mounted() {
    this.getCount();
  },
  computed: {
    selectAll: {
      get: function() {
        return this.arr ? this.checkedNames.length == this.arr.length : false;
      },
      set: function(value) {
        var checkedNames = [];

        if (value) {
          this.arr.forEach(function(user) {
            checkedNames.push(user.EmpId);
          });
        }
        this.checkedNames = checkedNames;
      }
    }
  },
  methods: {
    // getCount: function() {
    //   axios({
    //     method: "GET",
    //     url: "http://localhost:5000/api/v1/get/count"
    //   }).then(
    //     response => {
    //       this.UserCount = response.data[0].cnt;
    //       console.log(response);
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // },
    getData: function() {
      this.showLoader = true;
      this.showTbl = false;
      setTimeout(() => {
        axios({
          method: "GET",
          url: "http://localhost:5000/api/v1/get"
        }).then(
          response => {
            this.arr = response.data.result;
            this.showTbl = true;
            this.showLoader = false;
            console.log(response);
            if (this.arr.length == 0) {
              this.display = true;
              this.showTbl = false;
            }
          },
          error => {
            console.log(error);
            this.showTbl = false;
            this.showLoader = false;
          }
        );
      }, 2000);
    },
    redirect() {
      this.$router.push("/User/Add");
    },
    deleteData: function(EmpId) {
      ///console.log("id >>>>>>>>> ", EmpId);
      axios({
        method: "DELETE",
        url: `http://localhost:5000/api/v1/delete/${EmpId}`
      })
        .then(result => {
          //console.log("arr >>>>>>>>> ", this.arr);
          let deleteIndex = this.arr.findIndex(
            element => element.EmpId === EmpId
          );
          // console.log("deleteIndex >>>>>>>>> ", deleteIndex);
          this.arr.splice(deleteIndex, 1);
          alert("Deleted successfully");
          //console.log("deleted:" + result);
          if (this.arr.length == 0) {
            this.display = true;
            this.showTbl = false;
          }
        })
        .catch(e => {
          //console.log(e);
          alert("There is a problem in deleting");
        });
    },
    cancel: function() {
      this.$bvModal.hide("modal-scoped");
      // this.$router.go();
      this.getData();
    },
    ShowCheck: function() {
      this.showCheck = true;
      this.dtldtn = false;
      this.dtlAll = true;
      this.addBtn = false;
      this.dltth = false;
      this.seletAlbtn = false;
      this.thCheckBox = true;
    },
    deleteAll: function() {
      this.$bvModal.hide("modal-scoped");
      axios({
        method: "DELETE",
        url: `http://localhost:5000/api/v1/deleteMany?EmpId=[${
          this.checkedNames
        }]`
      })
        .then(result => {
          alert("Deleted successfully");
         this.getData();
          if (this.arr.length == 0) {
            this.display = true;
            this.showTbl = false;
          }
        })
        .catch(e => {
          alert("There is a problem in deleting" + e);
        });
    }
  }
};
</script>

<style>
</style>
