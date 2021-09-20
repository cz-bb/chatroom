<template>
  <div class="messages">
    <ul v-for="item in messages_list" :key="item.id">
      <li>
        <p @click="show_target($event)">{{item.messagename}}</p>
        <delete-btn :delete_value="item.messagename" from="messages"></delete-btn>
        <!-- <router-view/> -->
      </li>
    </ul>
  </div>
</template>

<script>
import deleteBtn from "../../../../components/home/aside/tabbar/deleteBtn.vue";

import axios from "axios";
import $ from 'jquery'
export default {
  name: "messages",
  data() {
    return {
      user_name: "",
      messages_list: []
    };
  },
  components: {
    deleteBtn
  },
  methods: {
    show_target(e) {
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
      $(".messages_items").last().after($("."+this.$route.query.talkto+"_show").parent())

    },
    test_btn() {
      this.$router.replace("/test").catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    // console.log('messages被创建了');
    // console.log(this.$route.query.user_name);
    this.$data.user_name = this.$route.query.user_name;
    axios({
      url: "http://localhost:8000/messages",
      params: {
        user_name: this.$data.user_name
      }
    })
      .then(res => {
        // console.log("messages",res.data);
        this.messages_list = res.data;
        // console.log(this.messages_list);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
@import url("../../../../assets/css/home/aside/tabbar/messages.css");
</style>