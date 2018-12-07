//public/src/main.js

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import 'bootstrap/dist/css/bootstrap.min.css';

import todolist from './components/app.vue'
import shoppinglist from './components/shopping.vue'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: shoppinglist },
    { path: '/todolist', component: todolist },
    { path: '/shoppinglist', component: shoppinglist }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
    <center><h3><span><router-link to="/todolist">To Do List</router-link></span> | 
    <span><router-link to="/shoppinglist">Shopping List</router-link></span> </h3></center>      
      <router-view></router-view>
    </div>
  `
}).$mount('#app')