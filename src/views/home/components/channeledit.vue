<template>
  <div class="popUp channel-edit">
    <van-cell title="单元格" value="内容" :border="false">
      <span slot="title">我的频道</span>
      <van-button
        slot="default"
        plain
        round
        type="danger"
        size="mini"
        @click="isShowEditBtn = !isShowEditBtn"
        >编辑</van-button
      >
    </van-cell>

    <van-grid :column-num="4" :gutter="15" class="recommend-grid">
      <van-grid-item
        v-for="(channel, index) in channels"
        @click="editOrSuccess(index)"
        :key="index"
        :text="channel.name"
        :class="{ red: index === active }"
      >
        <van-icon
          name="cross"
          class="iconcross"
          v-if="isShowEditBtn"
        ></van-icon>
        <span>{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="单元格" :border="false">
      <span slot="title">推荐频道</span>
    </van-cell>

    <van-grid :column-num="4" :gutter="15">
      <van-grid-item
        v-for="(residueChannel, index) in getResidueChannels"
        :key="index"
        :text="residueChannel.name"
      />
    </van-grid>
  </div>
</template>
<script>
import { AllChannels } from "@/api/articals";
export default {
  data() {
    return {
      allChannel: [], //所有频道列表数组
      isShowEditBtn: false, //完成编辑切换按钮
    };
  },
  props: {
    channels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.getAllChannels();
  },
  methods: {
    async getAllChannels() {
      try {
        const { data } = await AllChannels();
        this.allChannel = data.data.channels;
      } catch (err) {
        console.log(err);
      }
    },
    editOrSuccess(index) {
      if (this.isShowEditBtn) {
        //完成状态,没有叉号icon图标
      } else {
        //编辑状态,有icon图标
        this.$emit("change-active", index);
      }
    },
  },
  computed: {
    getResidueChannels() {
      return this.allChannel.filter((channel) => {
        let r = this.channels.find((item) => item.id === channel.id);
        return !r;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.popUp {
  margin-top: 100px;
  font-size: 27px;
  /deep/.van-grid-item__content {
    .iconcross {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

/deep/.red {
  color: red;
}
</style>
