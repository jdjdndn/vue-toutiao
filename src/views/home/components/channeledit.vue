import { login } from '../../../api/user'; /* 弹出层编辑我的频道,推荐频道 */
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
        @click="editOrSuccess(channel, index)"
        :key="index"
        :text="channel.name"
        :class="{ red: index === active }"
      >
        <van-icon
          name="cross"
          class="iconcross"
          v-if="isShowEditBtn && !fixedChannels.includes(channel.id)"
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
        @click="changeshengyuChannel(residueChannel, index)"
      />
    </van-grid>
  </div>
</template>
<script>
import {
  AllChannels,
  changeMyChannels,
  deleteMyChannels,
} from "@/api/articals";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  data() {
    return {
      allChannel: [], //所有频道列表数组
      isShowEditBtn: false, //完成编辑切换按钮
      fixedChannels: [0], //不被编辑,删除的频道列表
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
    editOrSuccess(channel, index) {
      if (this.isShowEditBtn) {
        //完成状态,没有叉号icon图标,删除
        if (this.fixedChannels.includes(channel.id)) return;
        if (index <= this.active) {
          this.$emit("change-active", this.active - 1);
        }
        this.channels.splice(index, 1);
        this.deleteChannels(channel);
      } else {
        //编辑状态,有icon图标
        this.$emit("change-active", index, false);
      }
    },
    async changeshengyuChannel(residueChannel, index) {
      //点击添加推荐频道到我的频道
      this.channels.push(this.getResidueChannels[index]);
      try {
        if (this.user) {
          //登录状态下
          await changeMyChannels({
            id: this.getResidueChannels[index].id, //剩余推荐频道的某个id
            seq: this.channels.length,
          });
        } else {
          //未登录状态下
          console.log(111);
          setItem("MY_CHANNELS", this.channels);
        }
      } catch (err) {
        this.$toast(err);
      }
    },
    async deleteChannels(channel) {
      //删除时登录发请求删除,未登录保存本地
      if (this.user) {
        //登录
        await deleteMyChannels(channel.id);
      } else {
        //未登录
        setItem("MY_CHANNELS", this.channels);
      }
    },
  },
  computed: {
    getResidueChannels() {
      //获取剩余的推荐频道
      return this.allChannel.filter((channel) => {
        let r = this.channels.find((item) => item.id === channel.id);
        return !r;
      });
    },
    ...mapState(["user"]),
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
