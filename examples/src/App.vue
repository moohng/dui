<template>
  <div id="app" @click="onClick">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Vue from 'vue';
import { Dialog } from '@moohng/dui';
// import Dialog from '@moohng/dui/lib/dialog';
import HelloWorld from './components/HelloWorld.vue';
import '@moohng/dui/lib/dialog/dialog.css';

Vue.use(Dialog);

export default {
  name: 'App',
  components: {
    HelloWorld,
    [Dialog.name]: Dialog,
  },
  methods: {
    onClick() {
      this.$dialog({
        title: '提示',
        content: '你好那',
      }, (index) => {
        console.log(index);
      });
    },
  },
};
</script>

<style lang="scss">
// @import '~@moohng/dui/lib/dui/dui.css';
@import '~@moohng/dui/lib/dui/dui.base.css';
// @import '~@moohng/dui/lib/dialog/dialog.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
