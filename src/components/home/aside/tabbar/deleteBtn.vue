<template>
  <div class="delete_btn">
    <button @click="delete_friends" @mouseenter="btn_show" @mouseout="btn_hidden">x</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "deleteFriends",
  data() {
    return {
      isdelete: false,
      value: "x",
      user_name: ""
    };
  },
  props: {
    delete_value: String,
    from: String
  },
  methods: {
    delete_friends(e) {
      //   console.log("hahaha");
      this.user_name = this.$route.query.user_name;
      if (this.from == "friends") {
        axios({
          url: "http://localhost:8000/delete_friends",
          params: {
            user_name: this.$route.query.user_name,
            delete_value: this.delete_value
          }
        })
          .then(res => {
            alert(res.data.message);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.from == "messages") {
        axios({
          url: "http://localhost:8000/delete_messages",
          params: {
            user_name: this.$route.query.user_name,
            delete_value: this.delete_value
          }
        })
          .then(res => {
            alert(res.data.message);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios({
          url: "http://localhost:8000/delete_groups",
          params: {
            user_name: this.$route.query.user_name,
            delete_value: this.delete_value
          }
        })
          .then(res => {
            alert(res.data.message);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    btn_show(e) {
      // console.log('gg');
      e.target.innerHTML = "delete";
    },
    btn_hidden(e) {
      e.target.innerHTML = "x";
    }
  }
};
</script>

<style>
.delete_btn button {
  height: 25px;
  width: 25px;
  border: none;
  border-radius: 50%;
  background-color: #fff;
  font-size: 20px;
  color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s linear;
}
.delete_btn button:hover {
  width: 100px;
  height: 35px;
  border-radius: 15px;
}
</style>