<template>
	  <van-cell :to="{
      name: 'article',
       params: {articleId: articles.art_id}
      }"
  >
    <div slot="title" class="title">{{ articles.title }}</div>
    <div slot="label">
      <div v-if="articles.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in articles.cover.images"
          :key="index"
        >
          <van-image
            
            :src="img"
          />
        </div>
      </div>
      <div>
        <span>{{ articles.aut_name }}</span>
        <span>{{ articles.comm_count }}评论</span>
        <span>{{ articles.pubdate }}</span>
      </div>
    </div>
    <van-image
      v-if="articles.cover.type === 1"
      slot="default"
     
      :src="articles.cover.images[0]"
    />
  </van-cell>
</template>

<script>
	export default {
		name: 'ArticleItem',
		data() {
			return {}
		},
		props: {
			articles: {
				type: Object,
				required: true,
			},
		},
		created() {},
	}
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
