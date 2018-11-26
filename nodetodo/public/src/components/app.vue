//public/src/components/app.vue
<template>
  <div id="app">
    <div class="container todo">
      <div class="todo-section">
        <create-todo></create-todo>
      </div>
      <br>
      <div class="todo-section">
        <list-todo></list-todo>
      </div>
    </div>
  </div>
</template>


<script>
  import createTodo from './createtodo.vue';
  import listTodo from './listtodo.vue';
  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {createTodo,  listTodo},
  }
</script>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  </style>