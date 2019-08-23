<template>
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column show-overflow-tooltip width="700px" label="标题" prop="title"></el-table-column>
      <el-table-column align="center" label="评论状态" prop="comment_status" :formatter="formatter"></el-table-column>
      <el-table-column align="center" label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="obj1">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            :style="{color:obj1.row.comment_status ? 'red' : '' } "
            @click="open(obj1.row)"
          >{{obj1.row.comment_status ? '关闭评论' : '开启评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 30px;" type="flex" justify="center">
      <el-pagination @current-change='changeCurrent' background layout="prev, pager, next" :total="pageData.total" :current-page='pageData.currentPage' :page-size="pageData.pageSizes"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pageData: {
        currentPage: 1,
        pageSizes: 10,
        total: 100
      },
      loading: ''
    }
  },
  methods: {
    changeCurrent (page) {
      this.pageData.currentPage = page
      this.getComment()
    },
    open (obj) {
      let bolen = obj.comment_status ? '开启' : '关闭'
      this.$confirm(`您确定要${bolen}评论吗?`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: obj.id.toString() },
          data: { allow_comment: !obj.comment_status }
        }).then(res => {
          this.getComment()
        })
      })
    },
    getComment () {
      this.loading = true
      let page = {
        page: this.pageData.currentPage,
        per_page: this.pageData.pageSizes
      }
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', ...page }
      }).then(res => {
        this.tableData = res.data.results
        this.pageData.total = res.data.total_count
        this.loading = false
      })
    },
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
