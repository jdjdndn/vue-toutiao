<template>
  <div>
    <!-- 路由占位符 -->
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <span>首页</span>
        <template #icon>
          <i class="iconfont iconwenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/artical">
        <span>文章</span>
        <template #icon>
          <i class="iconfont iconfenxiang"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <span>视频</span>
        <template #icon>
          <i class="iconfont iconshipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <template #icon>
          <i class="iconfont iconwode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    }
  },
}
</script>

<style lang="less" scoped></style>
