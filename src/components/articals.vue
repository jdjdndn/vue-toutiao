<template>
  <div class="artcile-list">
    <van-pull-refresh
      v-model="isLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <van-cell v-for="(item, index) in list" :key="index" :title="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtical } from '@/api/articals'
export default {
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      isLoading: false,
      refreshSuccessText: '刷新成功',
    }
  },
  methods: {
    async onLoad() {
      try {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        const { data } = await getArtical({
          channel_id: this.channel.id, // 频道 id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        this.list.push(data.data)

        // 加载状态结束
        this.loading = false
        if (data.data.length > 0) {
          // 数据全部加载完成
          this.timestamp = data.data.pre_timestamp
        } else {
          // 数据全部加载完成
          this.finished = true
        }
      } catch (err) {
        console.log(err, 'artical')
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        const { data } = await getArtical({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        this.list.unshift(data.data)
        this.refreshSuccessText = `刷新成功,新增加${data.data.length}条数据`
        // 加载状态结束
        this.isLoading = false
      } catch (err) {
        console.log(err, 'refresh')
        this.error = true
        this.isLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    },
  },
  async created() {
    try {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getArtical({
        channel_id: this.channel.id, // 频道 id
        timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      this.list.push(data.data)

      // 加载状态结束
      this.loading = false
    } catch (err) {
      console.log(err, 'artical')
      this.error = true
      this.loading = false
    }
  },
}
</script>

<style lang="less" scoped>
.artcile-list {
  height: 79vh;
  overflow: auto;
  width: 40%;
}
</style>
