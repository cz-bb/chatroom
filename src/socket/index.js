import io from "socket.io-client";
// const socket = io('/socket.io/');

// socket.on("connect", () => {
//   console.log("链接已建立。。。。。");
// });
// export default socket;
// import   "/socket.io/socket.io.js";
const socket = io();

socket.on("connect", () => {
  console.log("链接已建立。。。。。");
});
export default socket;