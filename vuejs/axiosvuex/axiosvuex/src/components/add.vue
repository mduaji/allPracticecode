<template>
  <div class="container">
    <div class="post-Dt-col">
      <p>
        EmpID:
        <input v-model="EmpId" type="Number" placeholder="Enter EmpID">
      </p>
      <p>
        Name:
        <input v-model="Name" type="text" placeholder="Enter Name">
      </p>
      <p>
        Role:
        <input v-model="Role" type="text" placeholder="Enter Role">
      </p>
      <p>
        PreOrganization:
        <input
          v-model="PreOrganization"
          type="text"
          placeholder="Enter PreOrganization"
        >
      </p>
      <b-button varient="primary" @click="addData()">Save</b-button>
      <b-button varient="primary" @click="updtData()">update</b-button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>EmpId</th>
          <th>Name</th>
          <th>Role</th>
          <th>PreOrganization</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in arr" :key="x.EmpId">
          <td>{{x.EmpId}}</td>
          <td>{{x.Name}}</td>
          <td>{{x.Role}}</td>
          <td>{{x.PreOrganization}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      EmpId: "",
      Name: "",
      Role: "",
      PreOrganization: ""
    };
  },
  mounted() {
    this.$store.dispatch("loadData");
  },
  computed: {
    ...mapState({
      arr: state => state.arr
    })
  },
  methods: {
    addData() {
      let payload = {
        EmpId: this.EmpId,
        Name: this.Name,
        Role: this.Role,
        PreOrganization: this.PreOrganization
      };
      this.$store.dispatch("postData", payload);
    },
    updtData() {
      let data = {
        EmpId: this.EmpId,
        Name: this.Name,
        Role: this.Role,
        PreOrganization: this.PreOrganization
      };
      this.$store.dispatch("putData", data);
    }
  }
};
</script>

<style>
</style>
