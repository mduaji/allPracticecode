<template>
  <div class="container">
    <h1>To-Do Application</h1>
    <div class="row">
      <table class="table">
        <thead>
          <th>Id</th>
          <th>Title</th>
          <th>Status</th>
          <th>Action</th>
        </thead>
        <tbody>
          <tr :v-for="item in arr">
          <td>{{item.Id}}</td>
          <td>{{item.Title}}</td>
          <td>
            <span
              :class="{donestatus:item.Status=='done',pendingstatus:item.Status=='pending'}"
            >{{item.Status}}</span>
          </td>
          <td>
            <button @click="onDelete(item)" type="button" class="btn btn-default">
              <span class="glyphicon glyphicon-trash"></span>
            </button>
          </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr>
    <div class="row">
      <div class="form-group">
        <label for="id">Id</label>
        <input v-model="model.Id" type="text" class="form-control" placeholder="Enter Id">
      </div>

      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="model.Title" type="text" class="form-control" placeholder="Enter Title">
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="model.Status" class="form-control">
          <option value="done">done</option>
          <option value="pending">pending</option>
        </select>
      </div>
      <div class="form-group">
        <button @click="onTodoAdd()" class="btn btn-primary">Add Todo</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
      model: {
        Id: "",
        Title: "",
        Status: "pending"
      }
    };
  },
  methods: {
    onDelete(item) {
      this.$http.delete(item.Id).then(
        response => {
          console.log(response);
          this.arr.splice(this.arr.indexOf(item), 1);
        },
        error => {
          console.log(error);
        }
      );
    },
    onTodoAdd() {
      this.$http.post("", this.model).then(
        response => {
          console.log(response);
          this.arr.push(this.model);
        },
        error => {
          console.log(error);
        }
      );
    },
    fetchTodos() {
      this.$http
        .get("")
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          this.arr = data;
          console.log(data);
        });
    }
  },
  beforeMount() {
    this.fetchTodos();
  }
};
</script>

<style>
.donestatus {
  color: blue;
}
.pendingstatus {
  color: red;
}
</style>