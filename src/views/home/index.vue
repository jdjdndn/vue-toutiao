<template>
  <div>
    <van-nav-bar fixed class="page-nav-bar">
      <van-button
        round
        class="search"
        slot="title"
        type="info"
        icon="search"
        size="mini"
        >搜索</van-button
      >
    </van-nav-bar>

    <van-tabs v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="(channel, index) in channels"
        :key="channel.id"
        ><articals :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont iconshipin"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import Articals from '@/components/articals'
import { getChannelList } from '@/api/user'
export default {
  data() {
    return {
      active: 0,
      channels: [],
    }
  },
  methods: {
    onLoad() {
      this.loading = false
    },
  },
  async created() {
    try {
      const { data } = await getChannelList()
      this.channels = data.data.channels
      // console.log(this.list)
    } catch (err) {
      this.$toast('获取频道列表失败')
    }
  },
  components: {
    Articals,
  },
}
</script>

<style lang="less" scoped>
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.iconfont {
    font-size: 33px;
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
/deep/.van-tabs.van-tabs--line {
  position: fixed;
  top: 102px;
}
</style>
