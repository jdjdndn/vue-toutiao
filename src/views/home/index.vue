/* home页面 */
<template>
  <div>
    <van-nav-bar  class="page-nav-bar">
      <van-button
        round
        class="search"
        slot="title"
        type="info"
        icon="search"
        size="mini"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <van-tabs v-model="active" animated swipeable :swipe-threshold="4">
      <van-tab
        :title="channel.name"
        v-for="(channel, index) in channels"
        :key="channel.id"
        ><articals :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="iconfont iconshipin"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      close-icon-position="top-left"
      closeable
      :style="{ height: '100%' }"
    >
      <!-- 弹出层内部组件 -->
      <ChannelEdit
        :active="active"
        :channels="channels"
        @change-active="handleActiveChange"
      />
    </van-popup>
  </div>
</template>

<script>
import Articals from "@/components/articals";
import ChannelEdit from "./components/channeledit";
import { getChannelList } from "@/api/user";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false, //是否展示弹出层组件
    };
  },
  methods: {
    onLoad() {
      this.loading = false;
    },
    handleActiveChange(index, isChannelEditShow = true) {
      //isChannelEditShow = true默认不关闭
      // console.log(index, "home");
      this.isChannelEditShow = isChannelEditShow;
      this.active = index; //tab组件的active与弹出层组件index一一对应
    },
  },
  async created() {
    //根据登录未登录来判断从本地还是发请求获取数据,如果登录就发请求,未登录本地有就本地去,本地没有发请求
    try {
      let tempChannels = []; //临时保存频道列表的数组
      if (this.user) {
        const { data } = await getChannelList();
        tempChannels = data.data.channels;
      } else {
        //未登录
        if (getItem("MY_CHANNELS")) {
          //本地有我的频道列表
          tempChannels = getItem("MY_CHANNELS");
        } else {
          //本地没有我的频道列表
          const { data } = await getChannelList();
          tempChannels = data.data.channels;
        }
      }
      // console.log(this.list)
      this.channels = tempChannels;
    } catch (err) {
      this.$toast("获取频道列表失败");
    }
  },
  components: {
    Articals,
    ChannelEdit,
  },
  computed: {
    ...mapState(["user"]),
  },
};
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
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
// /deep/.van-tabs.van-tabs--line {
//   position: fixed;
//   top: 102px;
// }
</style>
