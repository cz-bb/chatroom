const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const qs = require("qs");

app.use(cors());

const db = mysql.createConnection({
  //数据库链接池
  host: "localhost", //主机地址
  user: "root", //数据库所有人
  password: "", //密码
  // port:'3306',//端口
  database: "cz_test_database", //数据库名字
  // connectTimeout:5000,//链接超时
  // multipleStatements:false,//是否允许一个query中包含多条sql语句
});
// const router = express.Router();
// app.use(cors()); //解决跨域
// app.use(bodyParser.json()); //json请求
// app.use(bodyParser.urlencoded({ extended: false })); //表单请求

server.listen(8000, () => {
  console.log("服务启动");
});
io.on("connection", function(socket) {
  console.log("有链接");
  // console.log(socket);
  //接收数据
  socket.on("talk_out", (obj) => {
    console.log(obj);
    // 发送数据
    io.emit("talk_in", obj);
  });
});
app.all("/", (req, res, next) => {
  console.log("链接进入");
  res.json({ message: "这是8000/" });
  next();
});
app.get("/register", (req, res) => {
  //注册
  //   console.log(req.query);
  var get_username = req.query.username;
  var get_password = req.query.password;
  //   console.log(get_username);
  // res.json('hello world')
  // res.json('hello world')以json对象的形式返回
  // res.send()以页面的形式返回
  // res.download以文件的方式返回，前端会请求下载此文件
  db.query("SELECT username FROM user_table", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var index = data.findIndex((d) => {
        return d.username == req.query.username;
      });
      if (index == -1) {
        // console.log("可以注册");
        db.query(
          `INSERT INTO user_table (ID,username,password) values (0, "` +
            get_username +
            `","` +
            get_password +
            `" ) ;`,
          (err, data) => {
            if (err) {
              console.log("修改数据库失败！", err);
            } else {
              //   console.log("success");
              //   console.log(data);
              //创建消息表
              db.query(
                "CREATE TABLE " +
                  get_username +
                  "_messages (ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, messagename  VARCHAR(20)) ; ",
                (err, data) => {
                  if (err) {
                    console.log(err);
                  } else {
                    // console.log(data);
                    console.log("创建成功");
                  }
                }
              );
              //创建好友表
              db.query(
                "CREATE TABLE " +
                  get_username +
                  "_friends (ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, friendname  VARCHAR(20) ); ",
                (err, data) => {
                  if (err) {
                    console.log(err);
                  } else {
                    // console.log(data);
                    console.log("创建成功");
                  }
                }
              );
              //创建群组表
              db.query(
                "CREATE TABLE " +
                  get_username +
                  "_chatrooms (ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, chatroomname  VARCHAR(20) ); ",
                (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("创建群组列表成功");
                    // console.log(data);
                  }
                }
              );
              res.json({ ok: true, message: "注册成功!快去登录吧^_^" });
            }
          }
        );
      } else {
        // console.log("注册失败:该用户已存在");
        res.json({ ok: false, message: "注册失败：用户已存在" });
      }
    }
  });
});
app.get("/login", (req, res) => {
  //登录
  var get_username = req.query.username;
  var get_password = req.query.password;
  //   console.log(get_username, get_password);
  db.query("SELECT * FROM user_table", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var index_name = data.findIndex((d) => {
        // console.log(d.username);
        return d.username == get_username;
      });
      var index_pass = data.findIndex((d) => {
        return d.password == get_password;
      });
      if (index_name == -1) {
        // console.log("该用户不存在");
        res.json({ ok: false, message: "登录失败：用户不存在" });
      } else if (index_pass == -1) {
        // console.log("密码错误");
        res.json({ ok: false, message: "登录失败：密码错误" });
      } else {
        // console.log('密码正确，登录成功');
        // //获取消息列表
        // db.query(`SELECT * FROM ` + get_username + `_messages`, (err, data) => {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     // console.log(data);
        //     console.log(messages_data);
        //     res.json(messages_data)
        //   }
        // });
        // // 获取好友列表
        // db.query(`SELECT * FROM ` + get_username + `_friends`, (err, data) => {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     // console.log(data);
        //     friends_data = JSON.stringify(data);
        //     console.log({...friends_data});
        //   }
        // });
        // // 获取群组列表
        // db.query(
        //   `SELECT * FROM ` + get_username + `_chatrooms`,
        //   (err, data) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       // console.log(data);
        //       groups_data = JSON.stringify(data);
        //       // objectify()
        //       console.log(groups_data);
        //     }
        //   }
        // );
        res.json({
          ok: true,
          message: "登录成功!欢迎回来^_^",
        });
        // res.end()
      }
    }
  });
});
app.get("/messages", (req, res) => {
  var get_username = req.query.user_name;
  db.query("SELECT * FROM " + get_username + "_messages", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});
app.get("/friends", (req, res) => {
  var get_username = req.query.user_name;
  db.query("SELECT * FROM " + get_username + "_friends", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});
app.get("/groups", (req, res) => {
  var get_username = req.query.user_name;
  db.query("SELECT * FROM " + get_username + "_chatrooms", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});
app.get("/search", (req, res) => {
  var get_searchValue = req.query.search_value;
  // console.log(get_searchValue);
  var a = 0;
  var b = 0;
  //检索用户列表是否有目标用户名
  db.query("SELECT * FROM user_table", (err, data) => {
    if (err) {
    } else {
      // console.log(data);
      var index = data.findIndex(function(d) {
        return d.username == get_searchValue;
      });
      a = index;
      //检索聊天室列表是否有目标聊天室名
      db.query("SELECT * FROM chatroom_table", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          var index = data.findIndex(function(d) {
            return d.roomname == get_searchValue;
          });
          b = index;
          if (a >= 0 && b >= 0) {
            res.json({ ok: 1, message: "找到1个用户、1个群聊！" });
          } else if (a >= 0) {
            res.json({ ok: 2, message: "找到1个用户、0个群聊！" });
          } else if (b >= 0) {
            res.json({ ok: 3, message: "找到0个用户、1个群聊！" });
          } else {
            res.json({ ok: -1, message: "找到0个用户、0个群聊！" });
          }
        }
      });
    }
  });
});
app.get("/add", (req, res) => {
  var get_username = req.query.user_name;
  var get_friends = req.query.friends_name;
  db.query("SELECT * FROM " + get_username + "_friends ;", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var index = data.findIndex((d) => {
        return d.friendname == get_friends;
      });
      if (index == -1) {
        db.query(
          "INSERT INTO " +
            get_username +
            "_friends (friendname) values ( '" +
            get_friends +
            "' ) ;",
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
            }
          }
        );
        db.query(
          "INSERT INTO " +
            get_friends +
            "_friends (friendname) values ( '" +
            get_username +
            "' ) ;",
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
            }
          }
        );
        res.json({ ok: true, message: "添加成功！" });
      } else {
        res.json({ ok: false, message: "已经有该好友" });
      }
    }
  });
});
app.get("/join", (req, res) => {
  var get_username = req.query.user_name;
  var get_groups = req.query.groups_name;
  db.query("SELECT * FROM " + get_username + "_chatrooms ;", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var index = data.findIndex((d) => {
        return d.chatroomname == get_groups;
      });
      if (index == -1) {
        db.query(
          "INSERT INTO " +
            get_username +
            "_chatrooms (chatroomname) values ( '" +
            get_groups +
            "' ) ;",
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
            }
          }
        );
        res.json({ ok: true, message: "成功加入该群组！" });
      } else {
        res.json({ ok: false, message: "已经在该群组中" });
      }
    }
  });
});
app.get("/delete_friends", (req, res) => {
  var get_username = req.query.user_name;
  var get_friends = req.query.delete_value;
  console.log(get_username);
  console.log(get_friends);
  db.query(
    "DELETE FROM " +
      get_username +
      "_friends WHERE friendname='" +
      get_friends +
      "'",
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "DELETE FROM " +
            get_friends +
            "_friends WHERE friendname='" +
            get_username +
            "'",
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.json({ ok: true, message: "成功删除好友" });
            }
          }
        );
      }
    }
  );
});
app.get("/delete_messages", (req, res) => {
  var get_username = req.query.user_name;
  var get_messages = req.query.delete_value;
  db.query(
    "DELETE FROM " +
      get_username +
      "_messages WHERE messagename='" +
      get_messages +
      "'",
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ ok: true, message: "成功删除消息" });
      }
    }
  );
});
app.get("/delete_groups", (req, res) => {
  var get_username = req.query.user_name;
  var get_groups = req.query.delete_value;
  db.query(
    "DELETE FROM " +
      get_username +
      "_chatrooms WHERE chatroomname='" +
      get_groups +
      "'",
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ ok: true, message: "成功删除并退出群组" });
      }
    }
  );
});
