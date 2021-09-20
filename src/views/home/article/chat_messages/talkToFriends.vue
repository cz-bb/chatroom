<template>
  <div class="to_friends">
    <div class="talk_content">
      <div class="friends_items" v-for="item in friends_list" :key="item.id">
        <div :class="item.friendname+'_show'">
         
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import talkOut from "../../../../components/home/article/articleItem/talk/talkOut.vue";
// import talkIn from "../../../../components/home/article/articleItem/talk/talkIn.vue";
import axios from "axios";
export default {
  data() {
    return {
      friends_list: []
    };
  },
  props: {
    talkto: String
  },
  created() {
    axios({
      url: "http://localhost:8000/friends",
      params: {
        user_name: this.$route.query.user_name
      }
    })
      .then(res => {
        // console.log("messages",res.data);
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
@import url("../../../../assets/css/home/article/article_item/talkToFriends.css");
</style>