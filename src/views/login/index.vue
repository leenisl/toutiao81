<template>
  <div class="login">
    <!-- <el-button >打开消息提示</el-button> -->
    <el-card class="login-card">
      <div class="login-head">
        <img src="../../assets/logo_index.png" alt="">
      </div>
      <el-form class="form" :model='formData' :rules='rules' ref="form">
        <el-form-item prop='mobile'>
          <el-input placeholder="请输入手机号" v-model='formData.mobile' ></el-input>
        </el-form-item>
        <el-form-item prop='code' style='margin-bottom: 10px;' >
          <el-input class="coded" placeholder="验证码" v-model='formData.code'></el-input>
           <el-button style="float: right;width: 32%;">发送验证码</el-button>
        </el-form-item>
        <el-form-item style='margin-bottom: 30px;' prop='check' class="check-error">
          <el-checkbox v-model='formData.check'>我已阅读并同意<a href="#" >用户协议</a>和<a href="#">隐私条款</a></el-checkbox>
        </el-form-item>
        <el-form-item>
         <el-button type="primary" style="width: 100%;" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var func = function (rules, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('请勾选协议!!'))
      }
    }
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [
          { required: true, message: '登陆的手机号不能为空!!' },
          { pattern: /^1[3456789]\d{9}$/, message: '您输入的手机号格式不正确!!' }],
        code: [
          { required: true, message: '验证码不能为空!!' },
          { pattern: /^\d{6}$/, message: '请输入6位数字的验证码!!' }
        ],
        check: [{ validator: func }]
      }
    }
  },
  methods: {
    open () {
      this.$message('登录信息有误!!')
    },
    login () {
      this.$refs.form.validate((isok, res) => {
        if (isok) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.formData
          }).then(res => {
            if (res.status === 201) {
              localStorage.setItem('authorpass', JSON.stringify(res.data.data))
              this.$router.push('/home')
            }
          }).catch(res => {
            this.open()
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url('../../assets/login_bg.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card{
    width: 550px;
    // height: 340px;
    padding: 0 20px;
    box-sizing: border-box;
    .login-head {
      text-align: center;
      margin-bottom: 25px;
      img {
        width: 50%;
      }
    }
    .form {
      .coded {
        width: 65%;
      }

    }
  }
}

</style>
