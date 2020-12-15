<template>
  <div>
    <van-cell v-for="(article, index) in item" :key="index" article-item>
      <div slot="title">{{ article.title }}</div>

      <div slot="label">
        <!-- 三张图片 -->
        <div v-if="article.cover.type === '3'">
          <van-image
            v-for="(img, index) in article.cover.images"
            :key="index"
            :src="img"
          />
          <!-- 置顶,时间日期等 -->
          <div>
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{ article.pubdate | relativeTime }}</span>
          </div>
        </div>
      </div>
      <div slot="default">
        <!-- 一张图片 -->
        <div v-if="article.cover.type === '1'">
          <van-image :src="article.cover.images[0]" />
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
