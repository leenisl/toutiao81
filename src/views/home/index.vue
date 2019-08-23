<template>
 <el-container class="home">
 <el-aside class="aside-a">
   <aside-nav class="asidenav"></aside-nav>
 </el-aside>
 <el-container class="main-a">
   <el-header>
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
export default {
  name: 'home',
  components: {
    // 'aside-nav': asideNav
  }
}
</script>
<style lang="less" scoped>
.home {
  .aside-a {
    width: 200px!important;
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
    margin-left: 200px;
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
