<template>
  <el-card v-loading='loading' class="card">
    <el-tabs v-model="active" type="card" @tab-click="hClick">
      <el-tab-pane label="素材库" name="first">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部素材" name="false">
            <el-row>
              <el-col :span="3" v-for="(item, index) in imglist" :key="index" style="margin: 18px">
                <el-card :body-style="{ padding: '0px'}">
                  <img :src="item.url" :style='{height: "100px"}' class="image" @click="searchImg(item.url)" />
                </el-card>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="margin-top:25px;margin-bottom: 5px">
              <el-pagination
                @current-change="changepage"
                background
                layout="prev, pager, next"
                :total="page.total"
                :current-page="page.currentpage"
                :page-size="page.pagesize"
              ></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="收藏管理" name="true">
            <el-row>
              <el-col :span="3" v-for="(item, index) in imglist" :key="index" style="margin: 18px">
                <el-card :body-style="{ padding: '0px'}">
                  <img :src="item.url" class="image" :style='{height: "100px"}' />
                </el-card>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="margin-top:25px;margin-bottom: 5px">
              <el-pagination
                @current-change="changepage"
                background
                layout="prev, pager, next"
                :total="page.total"
                :current-page="page.currentpage"
                :page-size="page.pagesize"
              ></el-pagination>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="second">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request='upload'
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      activeName: 'false',
      imglist: [],
      page: {
        currentpage: 1,
        pagesize: 18,
        total: 0
      },
      loading: false,
      active: 'first'
    }
  },
  methods: {
    upload (file) {
      this.loading = true
      let formData = new FormData()
      formData.append('image', file.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: formData
      }).then(res => {
        this.loading = false
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.$emit('searchImg', res.data.url)
      })
    },
    searchImg (url) {
      this.$emit('searchImg', url)
    },
    hClick () {},
    changepage (page) {
      this.page.currentpage = page
      this.getmaterial()
    },
    handleClick (tab) {
      this.activeName = tab.name
      this.page.currentpage = 1
      this.getmaterial()
    },
    getmaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName,
          page: this.page.currentpage,
          per_page: this.page.pagesize
        }
      }).then(res => {
        this.imglist = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    this.getmaterial()
  }
}
</script>

<style>
.card {
  position: relative;
  top: -20px;
}
.image {
  width: 100%;
  height: 100px;
  display: block;
}
.upload-demo {
  position: absolute;
  left: 93%;
  z-index: 1;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  /* width: 200px; */
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  position: relative;
  top: 82px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
