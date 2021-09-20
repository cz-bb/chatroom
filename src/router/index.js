import Vue from "vue";
import VueRouter from "vue-router";
import enter from "../views/enter.vue";
import login from "../views/login.vue";
import home from "../views/home.vue";
import messages from "../views/home/aside/tabbar/messages.vue";
import friends from "../views/home/aside/tabbar/friends.vue";
import groups from "../views/home/aside/tabbar/groups.vue";
import talkToFriends from "../views/home/article/chat_messages/talkToFriends.vue"
import talkInGroups from "../views/home/article/chat_messages/talkInGroups.vue"
import talkNews from "../views/home/article/chat_messages/talkNews.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: enter,
  },
  {
    path: "/enter",
    component: enter,
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/home",
    component: home,
    children: [
      {
        path: "/messages",
        components: {
          default: messages,
          'talk':talkNews
        },
      },
      {
        path: "/friends",
        components: {
          default: friends,
          'talk': talkToFriends
        },
      },
      {
        path: "/groups",
        components: {
          default: groups,
          'talk': talkInGroups
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
