<template>
  <div class="article_item">
    <div class="article_top">
      <h4>{{isShow?search_result.title:this.$route.query.talkto}}</h4>
    </div>
    <div class="article_between">
      <search-show :search_result="search_result" v-if="isShow"></search-show>
      <router-view name="talk" :talkto="this.$route.query.talkto" :addHtml="this.addHtml" />
      <!-- **************************************************** -->
    </div>
    <div class="article_bottom">
      <div class="file">
        <div class="icon">
          <img src="../../../assets/img/表情.png" title="表情" />
          <img src="../../../assets/img/文件.png" title="文件" />
          <img src="../../../assets/img/语音.png" title="语音" />
          <img src="../../../assets/img/转账.png" title="转账" />
          <img src="../../../assets/img/语音通话.png" title="语音通话" />
          <img src="../../../assets/img/位置.png" title="位置" />
        </div>
      </div>
      <div class="input_say">
        <textarea name id cols="30" rows="4" placeholder="禁言中。。。。。" v-model="say"></textarea>
      </div>
      <div class="btn_send">
        <button @click="btn_send">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import searchShow from "./articleItem/search_show.vue";
import socket from "../../../socket/index.js";
import $ from "jquery";
export default {
  name: "articleItem",
  data() {
    return {
      say: "",
      addHtml: ""
    };
  },
  props: {
    search_result: Object,
    isShow: Boolean
  },
  components: {
    searchShow
  },
  methods: {
    btn_send() {
      if (this.say == "") {
        alert("不能为空");
      } else {
        console.log(this.say);
        this.addHtml =
          ` <div id='chat_mainout'>
            <div class='chat_constentout'>
              <p>` +
          this.say +
          ` </p>
            </div>
            <div class='chat_imgout'>
              <p> ` +
          this.$route.query.user_name +
          ` </p>
            </div>
          </div>`;
        console.log(this.$route.query.talkto);
        $("." + this.$route.query.talkto + "_show").append(this.addHtml);

        socket.emit("talk_out", {
          from: this.$route.query.user_name,
          to: this.$route.query.talkto,
          message: this.say,
          type: this.$route.path.replace("/", "")
        });
        this.say = "";
        // socket.on("talk_in", obj => {
        //   console.log(obj);
        // });
      }
    }
  },
  mounted() {
    socket.on("talk_in", obj => {
      console.log(obj);
      if (obj.type == "friends"&&obj.to == this.$route.query.user_name) {
        
          console.log("发给你的");
          var get_html =
            ` <div id='chat_mainin'>
            <div class='chat_constentin'>
              <p>` +
            obj.message +
            ` </p>
            </div>
            <div class='chat_imgin'>
              <p> ` +
            obj.from +
            ` </p>
            </div>
          </div>`;
          $("." + obj.from + "_show").append(get_html);
       
      } else if(obj.type == "groups"&&obj.to == this.$route.query.talkto&&obj.from!=this.$route.query.user_name){
         console.log("发给你的");
          var get_html =
            ` <div id='chat_mainin'>
            <div class='chat_constentin'>
              <p>` +
            obj.message +
            ` </p>
            </div>
            <div class='chat_imgin'>
              <p> ` +
            obj.from +
            ` </p>
            </div>
          </div>`;
          $("." + obj.to + "_show").append(get_html);
      }else{
        console.log('不是你的');
      }
    });
  }
};
</script>

<style>
@import url("../../../assets/css/home/article/article_item.css");
</style>