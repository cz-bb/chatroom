<template>
  <div class="main">
    <div class="div" name="div1"></div>
    <div class="div" name="div2"></div>
    <div class="div" name="div3"></div>
    <p @click="to_login">点击这里开始</p>
  </div>
</template>

<script>
export default {
  name: "enterBall",
  methods: {
    to_login() {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
@import url("../../assets/css/enter.css");
</style>