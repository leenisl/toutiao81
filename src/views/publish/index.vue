<template>
  <el-card class="card" style='margin-top: 20px'>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <div class="content">
      <el-form class="form" :model="formData" :rules="rules" ref='form' label-width="100px" >
        <el-form-item label="标题" prop="title">
          <el-input style="width:400px" placeholder="文章名称" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quillEditor style="width:70%;height: 200px;margin-bottom:100px" v-model="formData.content"   type="textarea" :rows="10" placeholder="请输入内容"></quillEditor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="formData.cover.type" @change='changeCover(formData.cover.type)' >
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <search-Img :images='formData.cover.images' @sImg='sImg'></search-Img>
        </el-form-item>
         <el-form-item label="频道" prop="channel_id">
          <el-select placeholder="请选择" v-model="formData.channel_id">
            <el-option
              v-for="item in channellist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn">
          <el-button class="btn-n" type="primary" @click="publish(false)">发布</el-button>
          <el-button class="btn-n" @click="publish(true)">存为草稿</el-button>
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
        channel_id: '',
        cover: {
          type: 0,
          images: []
        }
      },
      rules: {
        title: [{ required: true, message: '标题不能为空!!' }, { min: 5, max: 30, message: '标题应为5~30个字符之间' }],
        content: [{ required: true, message: '内容不能为空!!' }],
        channel_id: [{ required: true, message: '请选择频道!!' }]
      }
    }
  },
  methods: {
    sImg (url, index) {
      this.formData.cover.images.splice(index, 1, url)
    },
    changeCover (type) {
      if (type === 1) {
        this.formData.cover.images = ['']
      } else if (type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    getpublish (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(res => {
        console.log(res)
        this.formData = res.data
      })
    },
    publish (bol) {
      this.$refs.form.validate(isok => {
        if (isok) {
          let url = this.$route.params.publishId ? `/articles/${this.$route.params.publishId}` : '/articles'
          let method = this.$route.params.publishId ? 'put' : 'post'
          this.$axios({
            url,
            method,
            params: { draft: bol },
            data: this.formData
          }).then(res => {
            this.$router.push('/home/articles')
          })
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
    this.$route.params.publishId && this.getpublish(this.$route.params.publishId)
  },
  mounted () {
    console.log('触发组件')
  }
}
</script>

<style lang='less' scoped>
.card {
  min-height: 89vh;
  .content{
    padding: 0px 50px;
    .form {
      .btn {
        .btn-n {
          margin-top: 20px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
