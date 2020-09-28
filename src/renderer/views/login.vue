<template>
  <div>
    测试界面

    <button @click="addck">打开新的一个窗口</button>
  </div>
</template>
<script>
export default {
  methods: {
    addck() {
      this.$electron.ipcRenderer.send('Addwindow');
    },
  },
};
</script>
