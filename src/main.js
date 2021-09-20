import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SocketIO from "socket.io-client"
import VueSocketIO from 'vue-socket.io'
import  './socket/index'
// Vue.use(VueSocketIO)
// // import SocketIo from 'socket.io-client'
// Vue.use(
//   new VueSocketIO({
//     debug: true,
//     // 服务器端地址
//     connection: SocketIO('/api'),
//   })
// )
// var sockets = {
//   connecting() { console.log("正在连接"); },
//   disconnect() {console.log("连接断开"); }
// }

Vue.config.productionTip = false
new Vue({
  router,
  store,
  // sockets,
  render: h => h(App)
}).$mount('#app')

