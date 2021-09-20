<template>
  <div class="form">
    <div class="form_img">
      <img src="../../assets/img/添加.png" alt />
    </div>
    <div class="form_input">
      <div class="name">
        <label for="账号：">账号：</label>
        <input type="text" @input="account_input($event)" />
      </div>
      <div class="pwd">
        <label for="密码：">密码：</label>
        <input type="password" @input="pwd_input($event)" />
      </div>
    </div>
    <div class="form_btn">
      <button @click="btn_login">登录</button>
      <button @click="btn_register">注册</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

export default {
  // name: "form",
  data() {
    return {
      user_name: "",
      pwd: ""
    };
  },
  methods: {
    btn_login() {
      //登录
      axios({
        url: "http://localhost:8000/login",
        params: {
          username: this.$data.user_name,
          password: this.$data.pwd
        }
      })
        .then(res => {
          console.log(res.data);
          // alert(res.data.message);
          if (res.data.ok) {
            // console.log(res)
            alert(res.data.message);
            this.$router
              .replace("/messages?user_name=" + this.$data.user_name)
              .catch(err => {
                console.log(err);
              });
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    btn_register() {
      //注册
      axios({
        url: "http://localhost:8000/register",
        params: {
          username: this.$data.user_name,
          password: this.$data.pwd
        }
      })
        .then(res => {
          // console.log(res.data);
          alert(res.data.message);
        })
        .catch(err => {
          console.log(err);
        });
    },
    account_input(e) {
      this.$data.user_name = e.target.value;
    },
    pwd_input(e) {
      this.$data.pwd = e.target.value;
    }
  }
};
</script>
<style>
@import url("../../assets/css/login.css");
</style>