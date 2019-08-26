<template>
  <el-card class="card" v-loading="loading" style="margin-top: 20px">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <div class="info">
      <div class="infohead">
        <div class="left">
          <img :src="profile.photo" alt />
          <el-upload
            :show-file-list="false"
            action
            :http-request="cutImg"
            style="font-size:12px;margin:10px 0"
            type="text"
            @click="cutImg"
          >更换头像</el-upload>
        </div>
        <div class="mid">
          <div v-if="!revision">
            <p>{{profile.name}}</p>
            <span style="font-size: 14px;color: rgb(153, 153, 153)">{{profile.intro}}</span>
          </div>
          <div v-if="revision">
            <el-form
              ref="form"
              label-width="100px"
              style="width: 400px"
              :model="account"
              :rules="rules"
            >
              <el-form-item label="名称" prop="name">
                <el-input v-model="account.name"></el-input>
              </el-form-item>
              <el-form-item label="简介" prop="intro">
                <el-input v-model="account.intro"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="save" size="small">保存</el-button>
                <el-button size="small" @click="revision=false">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="right">
          <el-button type="text" style="margin-right: 10px;" @click="revamp" v-if="!revision">修改</el-button>
        </div>
      </div>
      <div class="infomid">
        <div class="mid-left">账号信息</div>
        <div class="mid-right">
          <div class="r-top">
            <div class="t-lef">头条号类型</div>
            <div class="t-right">个人</div>
          </div>
          <div class="r-bot">
            <div class="t-lef">头条号ID</div>
            <div class="t-right">{{profile.id}}</div>
          </div>
        </div>
      </div>
      <div class="infofot infomid">
        <div class="mid-left">登录方式</div>
        <div class="mid-right">
          <div class="r-top">
            <div class="t-lef">绑定手机</div>
            <div class="t-right">{{profile.mobile}}</div>
          </div>
        </div>
      </div>
      <div class="infobot infomid">
        <div class="mid-left">邮箱</div>
        <div class="mid-right">
          <div class="r-top">
            <div class="t-lef">
              <div v-if="!emailshow">{{profile.email}}</div>
              <div v-if="emailshow" style="margin-top:55px">
                <el-form ref="email" label-width="100px" style="width: 400px" :model="account"
              :rules="rules">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="account.email"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="savemail"  size="small">保存</el-button>
                    <el-button size="small" @click="emailshow=false">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>

            <!-- <div >修改邮箱</div> -->
            <el-button
              type="text"
              class="t-right"
              style="margin-right: 10px;"
              @click="emailshow =true"
            >修改邮箱</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      account: {
        name: null,
        intro: null,
        email: null
      },
      profile: {},
      revision: false,
      emailshow: false,
      rules: {
        name: [
          { required: true, message: '名称不能为空' },
          { min: 1, max: 7, message: '名字在1~7个字符之间' }
        ],
        email: [{ required: true, message: '邮箱不能为空' },
          { pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/, message: '邮箱格式不正确!!' }]
      },
      loading: false
    }
  },
  methods: {
    savemail () {
      this.$refs.email.validate(isok => {
        this.saveaccount()
      })
    },
    cutImg (file) {
      let data = new FormData()
      data.append('photo', file.file)
      this.loading = true
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.profile.photo = res.data.photo
        this.loading = false
        eventBus.$emit('cutImg')
      })
    },
    save () {
      this.$refs.form.validate(isok => {
        if (isok) {
          this.saveaccount()
        }
      })
    },
    saveaccount () {
      let d = {
        name: this.account.name ? this.account.name : this.profile.name,
        intro: this.account.intro ? this.account.intro : this.profile.intro,
        email: this.account.email ? this.account.email : this.profile.email
      }
      this.$axios({
        method: 'patch',
        url: '/user/profile',
        data: { ...d }
      }).then(({ data }) => {
        this.profile.name = data.name
        this.profile.intro = data.intro
        this.profile.email = data.email
        this.revision = false
        this.emailshow = false
        eventBus.$emit('cutImg')
      })
    },
    revamp () {
      this.account = {
        name: this.account.name ? this.account.name : this.profile.name,
        intro: this.account.intro ? this.account.intro : this.profile.intro,
        email: this.account.email ? this.account.email : this.profile.email
      }
      this.revision = true
    },
    getaccount () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        console.log(res)
        this.profile = res.data
      })
    }
  },
  created () {
    this.getaccount()
  }
}
</script>

<style lang='less' scoped>
.card {
  .info {
    padding: 10px;
    .infohead {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      border-bottom: 1px solid #ccc;
      .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 40px;
        margin-right: 40px;
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
      .mid {
        display: flex;
        flex-direction: column;
      }
      .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
      }
    }
    .infomid {
      display: flex;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      .mid-left {
        width: 150px;
        height: 150px;
        text-align: center;
        padding-top: 27px;
      }
      .mid-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 75px;
        .r-top {
          flex: 50%;
          display: flex;
          border-bottom: 1px solid #ccc;
          .t-lef {
            width: 150px;
          }
        }
        .r-bot {
          flex: 50%;
          display: flex;
          .t-lef {
            width: 150px;
          }
        }
      }
    }
    .infofot {
      height: 75px;
    }
    .infobot {
      height: 75px;
      border: none !important;
      .mid-right {
        .r-top {
          border: none !important;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
