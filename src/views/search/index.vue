<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" background="#3296fa" @focus="isShowResult = false" />
    </form>
    <!-- 搜索历史记录 -->
    <search-result v-if="isShowResult" :searchText="searchText"></search-result>
    <search-suggestion v-else-if="searchText" @search="onSearch" :searchText="searchText"></search-suggestion>
    <search-history v-else :search-histories="searchHistories" @search="onSearch" @delete-histories="searchHistories = []"></search-history>
  </div>
</template>
<script>

import searchHistory from "./components/search-history";
import searchSuggestion from "./components/search-suggestion";
import searchResult from "./components/search-result";
import { setItem, getItem } from '@/utils/storage'

export default {
  data () {
    return {
      searchText: "",
      isShowResult: false,
      searchHistories: getItem('SEARCH_HISTORY') || [], //搜索历史记录数组
    };
  },
  methods: {
    onSearch (val) {
      //按下回车,显示搜索结果组件
      this.searchText = val;
      //去重并且让后添加的在最前面
      let index = this.searchHistories.indexOf(val);
      if (index !== -1) this.searchHistories.splice(index, -1);
      this.searchHistories.push(val);
      this.isShowResult = true; //
    },
    onCancel () {
      this.$toast("取消");
      this.$router.push('/')
    },
  },
  created () { },
  components: {
    searchHistory,
    searchSuggestion,
    searchResult,
  },
  watch: {
    searchHistories (val) {//每次搜索建议,搜索结果都通过父组件
      setItem('SEARCH_HISTORY', val)
    }
  }
};
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .search-form {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
  }
}
</style>
