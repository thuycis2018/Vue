//public/src/components/listshopping.vue

<template>
    <div class="list-item-div">
        <div class="well well-lg" v-show="items.length>0">
            <h4>Your Shopping List</h4>
            <div class="row mrb-10" v-for="item in items">
                <div class="input-group m-b-5">
                    <span><input class="checkbox cr" type="checkbox" v-model="item.done" :checked="item.done" :value="item.done" v-on:change="updateItem(item)" title="Mark as done?"/></span>
                    <input type="text" class="form-control input-lg" :class="item.done?'item__done':''" v-model="item.name" @keypress="item.editing=true" @keyup.enter="updateItem(item)">
                    <span class="glyphicon glyphicon-remove" title="Delete item?" v-on:click="deleteItem(item._id)"></span>
                </div>
                <span class="help-block small" v-show="item.editing">Hit enter to update</span>
            </div>
        </div>
        <div class="row alert alert-info text-center" v-show="items.length==0">
            <p class="alert alert-info">
            Nothing on your shopping list!</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import bus from './../bus.js'

    export default {
        data() {
            return {
                items: []
            }
        },
        created: function() { // get items and start listening to events once component is created
            this.fetchItem();
            this.listenToEvents();
        },
        methods: {
            fetchItem() {
                let uri = '/api/allitems';
                axios.get(uri).then((response) => {
                    this.items = response.data;
                });
            },
            updateItem(item) {
                let id = item._id;
                let uri = '/api/updateitem/' + id;
                item.editing = false;
                axios.post(uri, item).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                })
            },
            deleteItem(id) { //delete item
                let uri = '/api/deleteitem/' + id;
                axios.get(uri);
                this.fetchItem();
            },
            listenToEvents() {
                bus.$on('refreshItem', ($event) => {
                    this.fetchItem(); // referesh or update item list on the page
                })
            }
        }
    }
</script>
