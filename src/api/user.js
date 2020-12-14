import store from '@/store'
/**
 * 用户登录请求模块
 */

import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data,
  })
}

/* 
    发送验证码
*/
export const mobile = mobile => {
  return request({
    url: '/app/v1_0/sms/codes/' + mobile,
    methods: 'GET',
  })
}

/* 
  获取用户自己信息
*/

export const getUserInfo = () => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/user',
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  })
}

/* 
  getChannelList
*/

export const getChannelList = () => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/user/channels',
  })
}
