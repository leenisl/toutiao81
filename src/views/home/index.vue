<template>
 <el-container class="home">
 <el-aside class="aside-a" :style="{width: open ? '64px' : '200px'}">
   <aside-nav class="asidenav"></aside-nav>
 </el-aside>
 <el-container class="main-a" :style="{marginLeft: open ? '64px'  :'200px'}">
   <el-header class="header" >
     <header-h></header-h>
   </el-header>
   <el-main class="elmain">
     <router-view class="main"></router-view>
   </el-main>
 </el-container>
 </el-container>
 </template>

<script>
// import asideNav from '../../components/home/aside-nav'
import eventBus from '../../utils/eventBus'
export default {
  name: 'home',
  components: {
    // 'aside-nav': asideNav
  },
  data () {
    return {
      open: false
    }
  },
  created () {
    eventBus.$on('open', (open) => {
      this.open = open
    })
  }
}
</script>
<style lang="less" scoped>
.home {
  .aside-a {
    height: 100vh;
    background: #323745;
    position: fixed;
    top: 0;
    left: 0;
    .asidenav{
      width: 200px;
    }

  }
  .main-a {
    //
    .elmain{
      padding: 10px 10px;
      .main {
      width: 100%;
      height: 100%;

    }
    }
  }
}
</style>
