<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

  export default {
    name: 'App',
    data() {
      return {
        zh_CN,
      };
    },
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  #app{
    width: 100%;
    height: 100%;
  }
</style>
