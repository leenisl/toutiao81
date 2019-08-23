<template>
  <el-row class="header" type="flex" justify="space-between">
    <el-col :span="16" class="head-left">
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="8" class="head-right">
      <el-dropdown trigger="click" class="user-info" @command="handleCommand">
        <span class="el-dropdown-link">
          {{user.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item command='a'>个人信息</el-dropdown-item>
          <el-dropdown-item command='b'>git地址</el-dropdown-item>
          <el-dropdown-item command='c'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <img :src="user.photo ? user.photo : defaultImg" alt />
       <span class="massage">消息</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      user: {

      },
      defaultImg: require('../../assets/avatar.jpg') // 图片变成base64
    }
  },
  methods: {
    getUser () {
      this.$axios({
        url: '/user/profile'

      }).then(res => {
        this.user = res.data
        // console.log(this.user)
      })
    },
    handleCommand (command) {
      if (command === 'a') {
        this.$router.push('/home/account')
      } else if (command === 'b') {
        window.location.href = 'https://github.com/shuiruohanyu/81heimatoutiao'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUser()
  }

}
</script>

<style lang='less' scoped>
.header {
  line-height: 60px;
  .head-left {
    display: flex;
    align-items: center;
    font-size: 16px;
    i {
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .head-right{
    .massage{
      float: right;
    }
    img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 30px;
    vertical-align: middle;
    float: right;
    position:relative;
    top: 10px;
    }
    .user-info{
      float: right;
    }

  }
}
</style>
