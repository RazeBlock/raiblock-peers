<template>
  <div id="app">
    <el-container>
      <el-header class="header-wrapper">
        <el-menu
          class="el-menu-top"
          :router="true"
          mode="horizontal"
          background-color="#303030"
          text-color="#ECF0F1"
          active-text-color="#ffeb3b"
        >
          <el-menu-item class="logo-menu-item" index="index" :route="{path: '/'}">
              <span class="special">R</span><span class="nono-special">aiblocks</span>
          </el-menu-item>
          <div class="item-right-wrapper">
            <el-menu-item index="1" :route="{path: '/network'}"><span>Network</span></el-menu-item>
          </div>
        </el-menu>
      </el-header>
      <el-main class="main-wrapper">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        activeIndex: '1'
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .header-wrapper {
    padding: 0;
  }
  .main-wrapper {
    padding: 0;
  }
  .el-menu-top {
    border-bottom: none;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .el-menu-item {
      &.is-active {
        border-bottom-color: #ffeb3b;
      }
    }
    .logo-menu-item {
      font-size: 26px;
      .special {
        color: #ffeb3b;
        font-size: 40px;
      }
      & > img {
        height: 30px;
      }
      &.is-active {
        border-bottom: none;
        border-bottom-color: transparent;
        .nono-special {
          color: #fff;
        }
      }
    }
    .item-right-wrapper {
      margin-left: 50px;
      overflow: hidden;
      float: left;
    }
  }
</style>
