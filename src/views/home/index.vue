<template>
 <el-container class="home">
 <el-aside class="aside-a">
   <aside-nav class="asidenav"></aside-nav>
 </el-aside>
 <el-container>
   <el-header>
     <header-h></header-h>
   </el-header>
   <el-main>
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
    .asidenav{
      width: 200px;
    }

  }
  .main {
    width: 100%;
    height: 100%;
  }
}
</style>
