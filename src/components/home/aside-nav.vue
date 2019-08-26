<template>
  <div class="aside" :style="{width: open ? '64px' : '200px'}">
    <div class="aside-user">
     <img :src="open? sImg:dImg" :style="{width: open ? '32px' : ''}" alt="">
   </div>
   <el-menu
      class="a-menu"
      background-color="#323745"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse='open'
      :collapse-transition='false'
      >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index='content'>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">文章列表</el-menu-item>
          <el-menu-item index="/home/comment">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材列表</el-menu-item>
      </el-submenu>
      <el-submenu index='fans'>
        <template slot="title">
          <i class="el-icon-s-check"></i>
          <span>粉丝管理</span>
        </template>
          <el-menu-item index="/home/fansData">图文数据</el-menu-item>
          <el-menu-item index="/home/fans">粉丝概况</el-menu-item>
          <el-menu-item index="/home/fansImg">粉丝画像</el-menu-item>
          <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
        <i class="el-icon-s-custom"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      open: false,
      dImg: require('../../assets/logo_admin.png'),
      sImg: require('../../assets/toutiao.png')
    }
  },
  methods: {
    togo () {
      console.log(123)
      eventBus.$emit('init')
    }
  },
  created () {
    eventBus.$on('open', (open) => {
      this.open = open
    })
  }
}
</script>

<style lang='less' scoped>
.aside {
  width: 200px;
  .aside-user{
      padding: 15px 0;
      text-align: center;
      background:#2e2f32;
      img {
        width: 120px;
      }
    }
  .a-menu{
    border-right: none;
  }
}

</style>
