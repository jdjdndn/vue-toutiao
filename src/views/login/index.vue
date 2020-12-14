import { setItem } from '../../utils/storage';
<template>
  <div class="login-container">
    <van-nav-bar class="van-nav-bar" title="标题">
      <van-icon
        name="cross"
        slot="left"
        @click="$router.push(this.$route.query.redirect || '/home')"
      />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont iconshoucang"></i
      ></van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        maxlength="6"
        :rules="[{ required: true, message: '请填写密码' }]"
        ><i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
            :time="1000 * 5"
            format="ss s"
          /><!-- finish事件关闭倒计时组件,v-if,v-else控制显示倒计时或发送验证码按钮 -->
          <van-button
            v-else
            size="small"
            type="primary"
            class="send-sms-btn"
            @click="sendSms"
            round
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          block
          type="info"
          native-type="submit"
          class="login-btn-wrap"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  created() {
    console.log(this.$route.query.redirect)
  },
  data() {
    return {
      user: {
        mobile: '13911111112',
        code: '246810',
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号必填' },
          { pattern: /^1(3|5|7|8|9)\d{9}$/, message: '请输入正确的手机号' },
        ],
        code: [
          { required: true, message: '验证码必填' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' },
        ],
      },
      isShowCountDown: false,
    }
  },
  methods: {
    async onSubmit(values) {
      //点击登录,提示登录中,验证表单,通过校验发送请求,存储token到vuex和本地
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, //禁止背景点击
        duration: 0, //提示框不关闭
      })
      try {
        const { data: res } = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功')
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        if (err.response.status == 400) {
          return this.$toast.fail('网络错误')
        }
        this.$toast.fail('未知错误,请稍后重试')
      }
    },
    async sendSms() {
      try {
        //点击发送验证码,单独校验手机号,打开计时器,关闭验证码按钮
        await this.$refs.loginFormRef.validate('mobile')
        this.isShowCountDown = true
      } catch (err) {
        if (err.response.status === 429) {
          return this.$toast.fail('发送验证码频繁,稍后重试')
        } else {
          return this.$toast.fail('发送验证码失败')
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.send-sms-btn {
  padding: 10px 20px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
  border: 0;
}
.van-button__text {
  font-size: 22px;
}
.login-btn-wrap {
  padding: 53px 33px;
}
/deep/.iconfont {
  font-size: 27px;
}
</style>
