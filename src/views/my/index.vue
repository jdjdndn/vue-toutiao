<template>
  <div class="my-container">
    <div>
      <div class="userinfo" v-if="user">
        <div class="avatar">
          <div class="left">
            <van-image fit="cover" round :src="userInfo.photo" />
            <span>直接起飞</span>
          </div>
          <div class="right">
            <van-button plain round type="primary" size="mini"
              >编辑资料</van-button
            >
          </div>
        </div>
        <!-- <div class="showInfo"></div> -->
        <div class="dianzan">
          <!-- 显示点赞粉丝收藏 -->
          <ul>
            <li>
              <div>{{ userInfo.art_count }}</div>
              <span>文章</span>
            </li>
            <li>
              <div>{{ userInfo.follow_count }}</div>
              <span>关注</span>
            </li>
            <li>
              <div>{{ userInfo.fans_count }}</div>
              <span>粉丝</span>
            </li>
            <li>
              <div>{{ userInfo.like_count }}</div>
              <span>喜欢</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="header" v-else>
        <img
          class="mobile-img"
          src="~@/assets/mobile.png"
          @click="$router.push('/login')"
        />
        <span class="denglu">登录/注册</span>
      </div>
    </div>

    <van-grid :border="false" :column-num="2">
      <van-grid-item>
        <i class="iconfont iconzuopin"></i>
      </van-grid-item>
      <van-grid-item>
        <i class="iconfont iconshoucang"></i>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell class="mb-9" title="小智同学" is-link />
      <van-cell
        class="mb-9"
        title="退出登录"
        is-link
        v-if="user"
        @click="logout"
      />
    </van-cell-group>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userInfo: {},
    }
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '标题',
          message: '弹窗内容',
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
          this.$router.push({
            name: 'login', query: { redirect: '/my' }
          })
        })
        .catch(() => {
          // on cancel
          this.$toast('取消退出登录')
        })
    },
  },
  async created() {
    if (this.user) {
      try {
        const { data: res } = await getUserInfo()
        this.userInfo = res.data
      } catch (err) {
        if (err.response.status == 401) {
          return this.$toast.fail('token过期')
        }
        this.$toast.fail('未知错误,请稍后重试')
      }
    }
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<style lang="less" scoped>
.my-container {
  > .header {
    height: 361px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .denglu {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 27px;
      flex-direction: column;
      color: #fff;
    }
  }
  .userinfo {
    height: 361px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    justify-content: center;
    align-items: center;
    .avatar {
      height: 230px;
    }
    .dianzan {
      height: 131px;
      // background-color: gray;
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          flex: 1;
          text-align: center;
          font-size: 28px;
          color: #fff;
        }
      }
    }
  }
}
.avatar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    /deep/.van-image__img {
      width: 132px;
      height: 132px;
      margin-right: 15px;
    }
    span {
      font-size: 27px;
      color: #fff;
    }
  }
}
</style>
