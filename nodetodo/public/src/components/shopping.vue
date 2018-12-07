//public/src/components/shopping.vue
<template>
  <div id="shopping">
    <div class="container item">
      <div class="item-section">
        <create-item></create-item>
      </div>
      <br>
      <div class="item-section">
        <list-item></list-item>
      </div>
    </div>
  </div>
</template>


<script>
  import createItem from './createshopping.vue';
  import listItem from './listshopping.vue';
  export default {
    name: 'shopping',
    data() {
      return {}
    },
    components: {createItem,  listItem},
  }
</script>
