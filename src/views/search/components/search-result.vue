<template>
  <div class="result-container">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title"></van-cell>
    </van-list>
  </div>
</template>
<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'suggestionResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      queryInfo: {
        page: 1,
        per_page: 10,
        q: this.searchText,
      },
      error: false,
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult(this.queryInfo)
        // console.log(data);
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.error = true
        this.loading = false
      }
    },
  },
  created () { },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="less" scoped></style>
