/*
文章列表模块
*/

import request from "@/utils/request";

export const getArtical = (params) => {
  return request({
    method: "GET",
    url: "/app/v1_1/articles",
    params,
  });
};

/* 全部频道列表 */

export const AllChannels = () => {
  return request({
    method: "GET",
    url: "/app/v1_0/channels",
  });
};

/* 
批量修改用户频道列表（部分覆盖）
*/

export const changeMyChannels = (channel) => {
  return request({
    method: "PATCH",
    url: "/app/v1_0/user/channels",
    data: {
      channels: [channel],
    },
  });
};

/* 
删除指定用户频道
*/
export const deleteMyChannels = (target) => {
  return request({
    method: "DELETE",
    url: "/app/v1_0/user/channels/" + target,
  });
};


/* 获取新闻文章详情 */
export const getUserArticle = articleId => {
  return request({
    method: 'GET',
    url: '/app/v1_0/articles/' +articleId
  })
}