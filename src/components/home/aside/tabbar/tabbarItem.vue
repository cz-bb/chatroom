<template>
  <div class="tab_items_outside" @click="change_view">
    <slot name="icon1" v-if="isActive"></slot>
    <slot name="icon2" v-else></slot>
    <div :style="active_style">
      <slot name="label"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbarItem",
  data(){
    return{
      user_name:''
    }
  },
  props: {
    path: String,
    active_color: {
      type: String
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path);
    },
    active_style() {
      return !this.isActive ? { color: this.active_color } : {};
    }
  },
  methods: {
    change_view() {
      this.$router.replace(this.path+"?user_name="+this.user_name).catch(err => err);
    }
  },
  created(){
    // console.log("tabbar_item组件："+this.$route.query.user_name);
    this.user_name = this.$route.query.user_name
  }
};
</script>
<style>
@import url("../../../../assets/css/home/aside/tabbar.css");
</style>