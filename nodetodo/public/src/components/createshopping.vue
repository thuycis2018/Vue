//public/src/components/createshopping.vue

<template>
  <div class="create-item-div">
    <h2>Shopping List</h2>
    <form @submit.prevent>
      <div class="form-group">
        <input type="text" class="create-item-input" @keypress="typing=true" placeholder="Enter an item" v-model="item" @keyup.enter="addItem($event)">
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
        item: '',
        typing: false,
      }
    },
    methods: {
      addItem(event) {
        if (event) event.preventDefault();
        let url = '/api/additem';
        let param = {
          name: this.item,
          done: 0
      };
        axios.post(url, param).then((response) => {
          console.log(response);
          this.clearItem();
          this.refreshItem();
          this.typing = false;
        }).catch((error) => {
          console.log(error);
        })
      },
      clearItem() {
        this.item = '';
      },
      refreshItem() {
        bus.$emit("refreshItem")
      }
    }
  }
</script>