<template>
  <div>
    <el-card class="top-card">
      <bread-crumb slot="header">
        <template slot="title">文章列表</template>
      </bread-crumb>
      <el-form class="form" >
        <el-form-item label="文章状态:">
          <el-radio-group v-model="formData.status" @change='refreshlist'>
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <el-select v-model="formData.channel" placeholder="请选择"  @change='refreshlist'>
            <el-option
              label="请选择"
              :value="null"
            ></el-option>
            <el-option
              v-for="item in channellist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker
            @change="refreshlist"
            v-model="formData.daterange"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format='yyyy-MM-dd'
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="bot-card">
      <template slot="header">共找到{{page.total}}条符合条件的内容</template>
      <div class="content" v-for="(item,index) in articleslist" :key="index">
        <div class="left">
          <img :src="item.cover.images[0]" alt />
          <div class="info">
            <span class="title">{{item.title}}</span>
            <el-tag class="status" :type='item.status | statustype '>{{item.status | statuscontent}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <el-link type="danger" :underline="false" @click='toEdit(item)'><i class="el-icon-edit" >修改</i></el-link>
          <el-link target="_blank" @click="delarticles(item.id)" :underline="false" :disabled='item.status === 2 ? true : false '><i class="el-icon-delete">删除</i></el-link>
        </div>
      </div>
      <el-row type="flex" justify="center" style="margin-top: 20px">
      <el-pagination @current-change='currentPage' background layout="prev, pager, next" :total="page.total" :current-page="page.currentpage" :page-size="page.pagesize" ></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      channellist: [],
      daterange: '',
      formData: {
        status: 5,
        channel: null,
        daterange: null
      },
      articleslist: [],
      page: {
        total: 0,
        currentpage: 1,
        pagesize: 10
      }
    }
  },
  methods: {
    toEdit (item) {
      this.$router.push(`/home/publish/${item.id.toString()}`)
    },
    delarticles (id) {
      console.log(id.toString())
      this.$confirm('您确定要删除该条信息吗?', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(res => {
          console.log(res)
          this.getarticles()
        })
      })
    },
    currentPage (page) {
      this.page.currentpage = page
      this.getarticles()
    },
    refreshlist () {
      this.page.currentpage = 1
      this.getarticles()
    },
    getarticles () {
      let { status, channel, daterange } = this.formData
      let params = {
        status: status === 5 ? null : status,
        channel_id: channel,
        begin_pubdate: daterange && daterange.length > 0 ? daterange[0] : null,
        end_pubdate: daterange && daterange.length > 1 ? daterange[1] : null,
        page: this.page.currentpage,
        per_page: this.page.pagesize
      }
      this.$axios({
        url: '/articles',
        params: { ...params }
      }).then(res => {
        this.articleslist = res.data.results
        this.page.total = res.data.total_count
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
  filters: {
    statustype (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'success'
        case 2:
          return ''
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    },
    statuscontent (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发布'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    }
  },
  created () {
    this.getchannels()
    this.getarticles()
  }
}
</script>

<style lang='less' scoped>
.top-card {
  margin-bottom: 10px;
  .form {
    padding-left: 30px;
  }
}
.content {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding: 10px;
  border-bottom: 1px dashed #ccc;
  .left {
    display: flex;
    justify-content: flex-start;
    img {
      width: 170px;
      height: 120px;
      margin-right: 20px;
      border-radius: 5px;
    }
    .info {
      display: flex;
      flex-direction: column;
      padding: 5px 0;
      justify-content: space-between;
      .status {
        font-size: 14px;
        text-align: center;
        width: 70px;
      }
      .date {
        font-size: 13px;
      }
    }
  }
  .right {
    i {
      margin-left: 15px;
    }
  }
}
</style>
