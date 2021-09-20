<template>
  <div class="friends">
    <ul v-for="item in friends_list" :key="item.id">
      <li>
        <p @click="show_target($event)">{{item.friendname}}</p>
        <delete-btn :delete_value="item.friendname" from="friends"></delete-btn>
        <router-view />
      </li>
    </ul>
  </div>
</template>

<script>
import deleteBtn from "../../../../components/home/aside/tabbar/deleteBtn.vue";
import axios from "axios";
import $ from 'jquery'

export default {
  name: "friends",
  data() {
    return {
      user_name: "",
      friends_list: []
    };
  },
  components: {
    deleteBtn
  },
  methods: {
    show_target(e) {
      // console.log(e.target.innerHTML);
      this.$emit("list_click");
      this.$router
        .replace(
          this.$route.path +
            "?user_name=" +
            this.$route.query.user_name +
            "&talkto=" +
            e.target.innerHTML
        )
        .catch(err => err);
      $(".friends_items").last().after($("."+this.$route.query.talkto+"_show").parent())
      
    }
  },
  created() {
    // console.log(this.$route.query.user_name);
    this.user_name = this.$route.query.user_name;
    axios({
      url: "http://localhost:8000/friends",
      params: {
        user_name: this.$data.user_name
      }
    })
      .then(res => {
        // console.log("friends", res.data);
        this.friends_list = res.data;
        // console.log(this.friends_list);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
@import url("../../../../assets/css/home/aside/tabbar/friends.css");
</style>