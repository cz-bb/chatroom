<template>
  <div class="search_show">
    <div class="search_item">
      <p>用户：{{search_result.friends}}</p>
      <button @click="add_friends" v-show="search_result.isFriends">添加好友</button>
    </div>
    <div class="search_item">
      <p>群组：{{search_result.groups}}</p>
      <button @click="join_groups" v-show="search_result.isGroups">加入群组</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {
    search_result: Object
  },
  methods: {
    add_friends() {
      // console.log(search_result);
      // console.log(this.search_result.search_value);
      // console.log(this.$route.query.user_name);
      if (this.search_result.search_value == this.$route.query.user_name) {
        alert("不能加自己做好友喔");
      } else {
        axios({
          url: "http://localhost:8000/add",
          params: {
            friends_name: this.search_result.search_value,
            user_name: this.$route.query.user_name
          }
        })
          .then(res => {
            console.log(res.data);
            if (res.data.ok) {
              alert(res.data.message);
            } else {
              alert(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    join_groups() {
      // console.log("55");
      axios({
        url: "http://localhost:8000/join",
        params: {
          groups_name: this.search_result.search_value,
          user_name: this.$route.query.user_name
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.ok) {
            alert(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.search_show {
  width: 100%;
  height: 100%;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 99;
}
.search_item {
  width: 95%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 3px white;
}
.search_item:hover {
  transform: scale(0.99);
}
.search_item p {
  position: relative;
  left: 15px;
}
.search_item button {
  position: relative;
  right: 15px;
  border: none;
  width: 100px;
  height: 30px;
  background-color: #fff;
  border-radius: 20px;
}
</style>