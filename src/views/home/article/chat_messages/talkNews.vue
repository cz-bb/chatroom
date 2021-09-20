<template>
  <div class="to_messages">
    <div class="talk_content">
      <div class="messages_items" v-for="item in messages_list" :key="item.id">
        <div :class="item.messagename+'_show'"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "talk_messages",
  data() {
    return {
      messages_list: []
    };
  },
  props: {
    talkto: String
  },
  created() {
    axios({
      url: "http://localhost:8000/messages",
      params: {
        user_name: this.$route.query.user_name
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
@import url("../../../../assets/css/home/article/article_item/talkNews.css");
</style>