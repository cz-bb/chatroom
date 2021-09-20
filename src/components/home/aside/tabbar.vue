<template>
  <div class="tabbar">
    <tabbar-item class="tabbar_items" path="/messages" active_color="#1296db" >
      <img slot="icon1" src="../../../assets/img/消息_01.png" />
      <img slot="icon2" src="../../../assets/img/消息_02.png" />
      <div slot="label">消息</div>
    </tabbar-item>
    <tabbar-item class="tabbar_items" path="/friends" active_color="#1296db" >
      <img slot="icon1" src="../../../assets/img/好友_01.png" />
      <img slot="icon2" src="../../../assets/img/好友_02.png" />
      <div slot="label">好友</div>
    </tabbar-item>
    <tabbar-item class="tabbar_items" path="/groups" active_color="#1296db" >
      <img slot="icon1" src="../../../assets/img/群组_01.png" />
      <img slot="icon2" src="../../../assets/img/群组_02.png" />
      <div slot="label">群组</div>
    </tabbar-item>
  </div>
</template>
<script>
import tabbarItem from "./tabbar/tabbarItem.vue";
export default {
  name: "tabbar",
  props:{
    user_name:String
  },
  components: {
    tabbarItem
  },
  created(){
    // console.log("tabbar组件："+this.$route.query.user_name);
    // console.log("tabbar组件：",this.user_name);
  }
};
</script>
<style>
</style>