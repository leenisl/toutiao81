<template>
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
      <template slot="title">图片管理</template>
    </bread-crumb>
    <el-tabs class="tab"  v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane class="tabtil" label=" 全部图片 " name="false">
        <div class="img-list">
          <el-card class="card" v-for="item in Imglist" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="icon" type="flex" justify="space-around" align="middle">
              <i class="el-icon-star-on icon-left"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row style="margin-top: 15px;" type="flex" justify="center">
          <el-pagination @current-change='changeCurrent' background layout="prev, pager, next" :total="page.total" :current-page ='page.currentpage' :page-size="page.pageSizes"></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane class="tabtil" label=" 收藏图片 " name="true">
         <div class="img-list">
          <el-card class="card" v-for="item in Imglist" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="icon" type="flex" justify="space-around" align="middle">
              <i class="el-icon-star-on icon-left"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row style="margin-top: 15px;" type="flex" justify="center">
          <el-pagination @current-change='changeCurrent' background layout="prev, pager, next" :total="page.total" :current-page ='page.currentpage' :page-size="page.pageSizes"></el-pagination>
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
      loading: false
    }
  },
  methods: {
    handleClick (tab, event) {
      this.activeName = tab.name
      this.page.currentpage = 1
      console.log(this.activeName)
      this.getMaterial()
    },
    changeCurrent (page) {
      this.page.currentpage = page
      console.log(page)
      this.getMaterial()
    },
    getMaterial () {
      this.loading = true
      let obj = {
        per_page: this.page.pageSizes,
        page: this.page.currentpage
      }
      console.log(obj.per_page, obj.page)

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
