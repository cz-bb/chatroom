<template>
  <div class="title">
    <div class="user_info">
      <div class="head_img">
        <img src="../../assets/img/01.jpg" alt />
      </div>
      <div class="info_list">
        <div>昵称：{{user_name}}</div>
        <div>账号：</div>
        <div>个性签名:</div>
      </div>
    </div>
    <div class="setting">
      <div class="setting_input">
        <input type="text" @input="search($event)" />
        <img src="../../assets/img/搜索.png" title="搜索" @click="search_btn" />
      </div>
      <div class="setting_icon">
        <img src="../../assets/img/换肤.png" title="换肤" name="function" />
        <img src="../../assets/img/更多.png" title="敬请期待" name="function" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "my_info",
  data() {
    return {
      user_name: "",
      search_value: ""
    };
  },
  methods: {
    search(e) {
      this.search_value = e.target.value;
    },
    search_btn() {
      // console.log(this.search_value);
      if (this.search_value == "") {
        alert("不能为空");
      } else {
        axios({
          url: "http://localhost:8000/search",
          params: {
            user_name: this.user_name,
            search_value: this.search_value
          }
        })
          .then(res => {
            // console.log(res.data);
            var friends = "";
            var groups = "";
            // var groups = '',
            if (res.data.ok == 1) {
              // console.log("该用户/群聊存在");
              alert("找到1个用户、1个群聊！");
              friends = this.search_value;
              groups = this.search_value;
              var isFriends = true;
              var isGroups = true;
            } else if (res.data.ok == 2) {
              // console.log("该用户存在");
              alert("找到1个用户、0个群聊！");
              friends = this.search_value;
              var isFriends = true;
              var isGroups = false;
            } else if (res.data.ok == 3) {
              // console.log("该群聊存在");
              alert("找到0个用户、1个群聊！");
              groups = this.search_value;
              var isFriends = false;
              var isGroups = true;
            } else {
              // console.log("该用户/群聊不存在");
              alert("找到0个用户、0个群聊！");
              var isFriends = false;
              var isGroups = false;
            }
            this.$emit("search_result", {
              isShow: true,
              search_value: this.search_value,
              title: "搜索结果",
              friends,
              groups,
              isFriends,
              isGroups
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    // console.log("info组件："+this.$route.query.user_name);
    this.user_name = this.$route.query.user_name;
  }
};
</script>

<style>
@import url("../../assets/css/home/header/info/my_info.css");
</style>