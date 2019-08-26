<template>
  <div class="Imgs">
    <div class="imglist" v-for="(item,index) in images" :key="index">
      <img :src="item ? item:defaultImg" alt @click="sreachImg(index)" />
    </div>
    <el-dialog class="coverImg" title="图片选择" width="50%" :visible.sync="dialogVisible" show-close>
      <cover-Img @searchImg='sImg'></cover-Img>
      <el-row type="flex" justify="center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      imgIndex: '',
      defaultImg: require('../../assets/pic_bg.png')
    }
  },
  props: ['images'],
  methods: {
    sImg (url) {
      this.$emit('sImg', url, this.imgIndex)
      this.dialogVisible = false
    },
    sreachImg (index) {
      this.dialogVisible = true
      this.imgIndex = index
    }
  }
}
</script>

<style lang='less' scoped>
.Imgs {
  display: flex;
  .imglist {
    width: 150px;
    height: 150px;
    border: 1px solid #ccc;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
