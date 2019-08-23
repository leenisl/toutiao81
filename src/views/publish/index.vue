<template>
  <el-card class="card">
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <div class="content">
      <el-form class="form" :model="formData" :rules="rules" ref='form' label-width="100px" >
        <el-form-item label="标题" prop="title">
          <el-input style="width:400px" placeholder="文章名称" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input style="width:70%;" v-model="formData.content"   type="textarea" :rows="10" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="formData.img" >
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item label="频道" prop="channels">
          <el-select placeholder="请选择" v-model="formData.channels">
            <el-option
              v-for="item in channellist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn">
          <el-button class="btn-n" type="primary" @click="publish">发布</el-button>
          <el-button class="btn-n">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channellist: [],
      formData: {
        title: '',
        content: '',
        channels: '',
        name: '',
        img: 1
      },
      rules: {
        title: [{ required: true, message: '标题不能为空!!' }],
        content: [{ required: true, message: '内容不能为空!!' }],
        channels: [{ required: true, message: '请选择频道!!' }]
      }
    }
  },
  methods: {
    publish () {
      this.$refs.form.validate(isok => {
        if (isok) {
          console.log('ok')
        }
      })
    },
    getchannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channellist = res.data.channels
      })
    }
  },
  created () {
    this.getchannels()
  }
}
</script>

<style lang='less' scoped>
.card {
  min-height: 91vh;
  .content{
    padding: 20px 50px;
    .form {
      .btn {
        .btn-n {
          margin-top: 20px;
          margin-left: 50px;
        }
      }
    }
  }
}
</style>
