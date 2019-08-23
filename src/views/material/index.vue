<template>
  <el-card v-loading="loading" class="maincard">
    <bread-crumb slot="header">
      <template slot="title">图片管理</template>

    </bread-crumb>
    <el-upload
        class="upload"
        action=""
        :multiple='false'
        :show-file-list='false'
        :http-request='upload'
      >
      <el-button type="primary">上传图片</el-button>
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>
    <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="tabtil" label=" 全部图片 " name="false">
        <div class="img-list">
          <el-card class="card" v-for="item in Imglist" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="icon" type="flex" justify="space-around" align="middle">
              <i
                @click="collectImg(item)"
                class="el-icon-star-on icon-left"
                :style="{color: item.is_collected ? 'red' : ''}"
              ></i>
              <i @click="delMaterial(item)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row style="margin-top: 15px;" type="flex" justify="center">
          <el-pagination
            @current-change="changeCurrent"
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentpage"
            :page-size="page.pageSizes"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane class="tabtil" label=" 收藏图片 " name="true">
        <div class="img-list">
          <el-card class="card" v-for="item in Imglist" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="icon" type="flex" justify="space-around" align="middle">
              <!-- <i class="el-icon-star-on icon-left"></i>
              <i  class="el-icon-delete-solid"></i>-->
            </el-row>
          </el-card>
        </div>
        <el-row style="margin-top: 15px;" type="flex" justify="center">
          <el-pagination
            @current-change="changeCurrent"
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentpage"
            :page-size="page.pageSizes"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      Imglist: [],
      page: {
        total: 0,
        currentpage: 1,
        pageSizes: 10
      },
      activeName: 'false',
      loading: false,
      collect: ''
    }
  },
  methods: {
    upload (file) {
      let formData = new FormData()
      formData.append('image', file.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: formData
      }).then(res => {
        this.getMaterial()
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      })
    },
    collectImg (item) {
      this.collect = item.is_collected
      this.$axios({
        method: 'put',
        url: `user/images/${item.id}`,
        data: { collect: !this.collect }
      }).then(res => {
        this.getMaterial()
      })
    },
    delMaterial (item) {
      this.$confirm('您确定要删除该条图片?', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${item.id}`
        }).then(res => {
          this.getMaterial()
        })
      })
    },
    handleClick (tab, event) {
      this.activeName = tab.name
      this.page.currentpage = 1
      this.getMaterial()
    },
    changeCurrent (page) {
      this.page.currentpage = page
      this.getMaterial()
    },
    getMaterial () {
      this.loading = true
      let obj = {
        per_page: this.page.pageSizes,
        page: this.page.currentpage
      }
      this.$axios({
        method: 'get',
        url: '/user/images',
        params: { collect: this.activeName, ...obj }
      }).then(res => {
        this.Imglist = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.maincard {
  position: relative;
  .upload {
  position: absolute;
  right: 30px;
  top: 60px;
  z-index: 1;
}
}

.img-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .card {
    width: 250px;
    height: 300px;
    margin: 15px 20px;
    position: relative;
    img {
      width: 100%;
      height: 70%;
    }
    .icon {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      font-size: 22px;
      .icon-left {
        font-size: 26px;
      }
    }
  }
}
</style>
