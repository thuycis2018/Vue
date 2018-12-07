//public/src/main.js
'use strict'
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './components/app.vue'

new Vue({
  el: 'app',
  created: function () {
    console.log('root instance was created')
  },
  components: {app},
  methods: {}
})