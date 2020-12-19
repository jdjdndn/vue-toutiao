<template>
  <div>
    <van-cell title="历史记录" value="内容">
      <div v-if='isDeleteShow'>
        <span @click='$emit("delete-histories")'>全部删除</span>
        <span @click='isDeleteShow=false'>完成</span>
      </div>
      <van-icon name="delete" v-else @click='isDeleteShow = true' />
    </van-cell>
    <van-cell v-for="(item, index) in searchHistories" :key="index" :title="item" @click='deleteHistory(item,index)'>
      <van-icon name="close" v-if='isDeleteShow' />
    </van-cell>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isDeleteShow: false //展示删除状态
    }
  },
  methods: {
    deleteHistory (item, index) {
      if (this.isDeleteShow) {
        //删除
        this.searchHistories.splice(index, 1)
      } else {
        this.$emit('search', item)
        //搜索
      }
    }
  },
  created () { },
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style lang="less" scoped></style>
