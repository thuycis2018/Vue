//public/src/components/createTodo.vue

<template>
  <div class="create-todo-div">
    <h2>Add Todo Item</h2>
    <form @submit.prevent>
      <div class="form-group">
        <input type="text" class="create-todo-input" @keypress="typing=true" placeholder="Start a wonderful day!" v-model="todo" @keyup.enter="addTodo($event)">
        <span class="help-block small text-center" v-show="typing">Hit enter to save</span>
        <br>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';  
  import bus from "./../bus.js";

  export default {
    data() {
      return {
        todo: '',
        typing: false,
      }
    },
    methods: {
      addTodo(event) {
        if (event) event.preventDefault();
        let url = 'http://localhost:1338/api/add';
        let param = {
          name: this.todo,
          done: 0
      };
        axios.post(url, param).then((response) => {
          console.log(response);
          this.clearTodo();
          this.refreshTodo();
          this.typing = false;
        }).catch((error) => {
          console.log(error);
        })
      },
      clearTodo() {
        this.todo = '';
      },
      refreshTodo() {
        bus.$emit("refreshTodo")
      }
    }
  }
</script>