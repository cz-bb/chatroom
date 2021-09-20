<template>
  <div class="home">
    <!-- <bg-img></bg-img> -->
    <header>
      <my-info @search_result="show_result"></my-info>
    </header>
    <div class="centre">
      <aside>
        <tabbar></tabbar>
        <router-view @list_click="change_show" ></router-view>
      </aside>
      <article>
        <article-item :search_result="search_result" :isShow="search_result.isShow" ></article-item>
      </article>
    </div>
  </div>
</template>
<script>
import myInfo from "../components/home/my_info.vue";
import tabbar from "../components/home/aside/tabbar.vue";
import articleItem from "../components/home/article/articleItem.vue";
import bgImg from "../components/home/bgImg.vue";
import axios from "axios";
import qs from "qs";
export default {
  name: "home",
  data() {
    return {
      user_name: "",
      search_result: {},
      // result_show:Boolean,
    };
  },
  methods: {
    show_result(result) {
      console.log(result);
      this.search_result = result;
    },
    change_show(){
      // this.result_show = false
      this.search_result.isShow = false
    },
  },
  components: {
    myInfo,
    tabbar,
    articleItem,
    bgImg
  },
  created() {
    // console.log(this.$route.query.user_name);
    this.$data.user_name = this.$route.query.user_name;
  }
};
</script>

<style>
@import url("../assets/css/home.css");
</style>