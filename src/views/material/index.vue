<template>
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-upload class="upload-demo" action :show-file-list='false' :http-request='upload'>
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部素材" name="false">
        <el-row>
          <el-col :span="3" v-for="(item, index) in imglist" :key="index" style="margin: 14px">
            <el-card :body-style="{ padding: '0px'}">
              <img :src="item.url" class="image" />
              <div style="padding: 14px;">
                <el-row type="flex" justify="space-around" style="font-size: 22px">
                  <i
                    class="el-icon-star-on"
                    :style="{color: item.is_collected ? 'red' : ''}"
                    @click="collectImg(item)"
                  ></i>
                  <i class="el-icon-delete" @click="delImg(item.id)"></i>
                </el-row>
              </div>
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
          <el-col :span="3" v-for="(item, index) in imglist" :key="index" style="margin: 14px">
            <el-card :body-style="{ padding: '0px'}">
              <img :src="item.url" class="image" />
              <div style="padding: 14px;">
                <el-row type="flex" justify="space-around" style="font-size: 22px">
                  <i
                    class="el-icon-star-on"
                    :style="{color: item.is_collected ? 'red' : ''}"
                    @click="collectImg(item)"
                  ></i>
                  <i class="el-icon-delete" @click="delImg(item.id)"></i>
                </el-row>
              </div>
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'false',
      imglist: [],
      page: {
        currentpage: 1,
        pagesize: 21,
        total: 0
      },
      loading: false
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
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.getmaterial()
      })
    },
    collectImg (item) {
      console.log(item)
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: { collect: !item.is_collected }
      }).then(res => {
        this.$message({
          message: item.is_collected ? '已取消收藏!!' : '收藏成功!!',
          type: 'success'
        })
        this.getmaterial()
      })
    },
    delImg (id) {
      this.$confirm('您确定要删除该图片吗?', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${id}`
        }).then(res => {
          this.getmaterial()
        })
      })
    },
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

<style lang='less'>
.image {
  width: 100%;
  height: 190px;
  display: block;
}
.upload-demo{
  position: absolute;
  left: 93%;
  z-index: 1;
}
</style>
