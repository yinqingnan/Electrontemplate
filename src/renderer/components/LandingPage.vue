<template>
  <div id="wrapper">
    <button @click="btn">最小化到托盘</button>
    <button @click="sendNotification">发送系统通知</button>
    <button @click="addck">打开新的一个窗口</button>
  </div>
</template>

<script>
export default {
  name: 'landing-page',
  data() {
    return {
      system: null,
    };
  },
  // components: {  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    btn() {
      let { system } = this._data;

      if (system == 'Win32') {
        this.$electron.ipcRenderer.send('hide-main-window');
      } else if (system == 'Win64') {
        this.$electron.ipcRenderer.send('hide-main-window');
      } else if (system == 'Mac') {
        alert('Mac系统');
      }
    },
    sendNotification() {
      const path = require('path');
      const myNotification = new Notification('附带图像的通知', {
        body: '通知正文内容',
        icon: `${__static}/q9.ico`, //该图片路径必须保存到根目录下的static文件夹内
      });
      myNotification.onclick = () => {
        console.log('通知被点击');
      };
    },
    IsSystem() {
      //判断当前系统
      var agent = navigator.userAgent.toLowerCase();
      var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
      if (agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0) {
        console.log('这是windows32位系统');
        this.system = 'Win32';
      }
      if (agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0) {
        console.log('这是windows64位系统');
        this.system = 'Win64';
      }
      if (isMac) {
        console.log('这是mac系统');
        this.system = 'Mac';
      }
    },
    addck() {
      this.$electron.ipcRenderer.send('Addwindow', 111111);
    },
  },
  mounted() {
    // 接收主进程传递过来的数据
    this.$electron.ipcRenderer.on('datamsg', (event, params) => {
      console.log(params);
    });
    this.IsSystem();
    let x = window.screen.availWidth - 300 + 5;
    let y = window.screen.availHeight - 200 + 5;
    console.log(x, y);
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
