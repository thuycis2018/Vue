//public/src/components/listtodo.vue

<template>
    <div class="list-todo-div">
        <div class="well well-lg" v-show="todos.length>0">
            <h4>Your List</h4>
            <div class="row mrb-10" v-for="todo in todos">
                <div class="input-group m-b-5">
                    <span><input class="checkbox cr" type="checkbox" v-model="todo.done" :checked="todo.done" :value="todo.done" v-on:change="updateTodo(todo)" title="Mark as done?"/></span>
                    <input type="text" class="form-control input-lg" :class="todo.done?'todo__done':''" v-model="todo.name" @keypress="todo.editing=true" @keyup.enter="updateTodo(todo)">
                    <span class="glyphicon glyphicon-remove" title="Delete todo?" v-on:click="deleteTodo(todo._id)"></span>
                </div>
                <span class="help-block small" v-show="todo.editing">Hit enter to update</span>
            </div>
        </div>
        <div class="row alert alert-info text-center" v-show="todos.length==0">
            <p class="alert alert-info">
              <strong>All Caught Up</strong>
            <br/>
            You do not have any items</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import bus from './../bus.js'

    export default {
        data() {
            return {
                todos: []
            }
        },
        created: function() { // get todo items and start listening to events once component is created
            this.fetchTodo();
            this.listenToEvents();
        },
        methods: {
            fetchTodo() {
                let uri = '/api/all';
                axios.get(uri).then((response) => {
                    this.todos = response.data;
                });
            },
            updateTodo(todo) {
                let id = todo._id;
                let uri = '/api/update/' + id;
                todo.editing = false;
                axios.post(uri, todo).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                })
            },
            deleteTodo(id) { //delete todo item
                let uri = '/api/delete/' + id;
                axios.get(uri);
                this.fetchTodo();
            },
            listenToEvents() {
                bus.$on('refreshTodo', ($event) => {
                    this.fetchTodo(); // referesh or update todo list on the page
                })
            }
        }
    }
</script>