<template>
  <div class="form_outside">
    <login-register></login-register>
  </div>
</template>
<script>
import loginRegister from "../components/loginRegister/loginRegister.vue";
export default {
  name: "login",
  components: {
    loginRegister
  }
};
</script>
<style>
</style>