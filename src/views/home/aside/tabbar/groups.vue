<template>
  <div class="groups">
    <ul v-for="item in groups_list" :key="item.id">
      <li>
        <p @click="show_target($event)">{{item.chatroomname}}</p>
        <delete-btn :delete_value="item.chatroomname" from="groups"></delete-btn>
        <router-view />
      </li>
    </ul>
  </div>
</template>
<script>
import deleteBtn from "../../../../components/home/aside/tabbar/deleteBtn.vue";
import $ from 'jquery'
import axios from "axios";
export default {
  name: "groups",
  data() {
    return {
      user_name: "",
      groups_list: []
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
      $(".groups_items").last().after($("."+this.$route.query.talkto+"_show").parent())
    }
  },
  created() {
    this.user_name = this.$route.query.user_name;
    axios({
      url: "http://localhost:8000/groups",
      params: {
        user_name: this.$data.user_name
      }
    })
      .then(res => {
        // console.log("groups", res.data);
        this.groups_list = res.data;
        // console.log(this.groups_list);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
@import url("../../../../assets/css/home/aside/tabbar/groups.css");
</style>