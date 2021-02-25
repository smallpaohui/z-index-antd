<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">LOGO</div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="currentPath">
        <a-menu-item v-for="item in routes" :key="item.path">
          <router-link :to="item.path">
            <a-icon type="user"/>
            <span>{{item.meta.name}}</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;display: flex;justify-content:space-between">
        <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
        />
        <div style="display: flex;align-items: center;padding: 0 20px">
          <a-avatar style="margin: 0 5px;box-shadow: 0 0 2px #666"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              admin
              <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="userOut">
                <a href="javascript:;">
                  <a-icon type="poweroff"/>
                  退出登录
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: `${this.$route.path==='/'?'#F0F2F5':'#fff'}`, minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
  export default {
    data () {
      return {
        collapsed: false,
      }
    },
    methods: {
      userOut () {
        this.$router.push('/login')
        sessionStorage.clear()
      },
    },
    computed: {
      routes () {
        return this.$router.options.routes[0].children
      },
      currentPath () {
        return [
          this.$route.path,
        ]
      },
    },
  }
</script>
<style scoped>
  #components-layout-demo-custom-trigger {
    height: 100vh;
  }

  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    color: white;
    text-align: center;
    line-height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
