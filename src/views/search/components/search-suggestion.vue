<template>
	<div>
		<van-cell
			title="单元格"
			icon="search"
			v-for="(text, index) in suggestions"
			:key="index"
			@click="$emit('search', text)"
		>
			<!-- 将字符串外包标签加类实现变色, v-html解析标签 -->
			<div slot="title" v-html="heightLight(text)"></div>
		</van-cell>
	</div>
</template>
<script>
	import { getSearchSuggestion } from '@/api/search'
	import { debounce } from 'lodash'
	export default {
		data() {
			return {
				suggestions: [], //搜索建议数组
			}
		},
		props: {
			searchText: {
				//父组件传递的搜索框文本
				type: String,
				required: true,
			},
		},
		watch: {
			searchText: {
				handler: debounce(function(value) {
					//debounce防抖
					this.loadSuggestion(value)
				}, 200),
				immediate: true, //上来直接调用
			},
		},
		methods: {
			async loadSuggestion(q) {
				try {
					const { data } = await getSearchSuggestion(q)
					this.suggestions.push(...data.data.options)
				} catch (err) {
					console.log(err)
				}
			},
			heightLight(text) {
				//替换文本,包标签加样式
				const reg = new RegExp(this.searchText, 'gi')
				return text.replace(
					reg,
					`<span style='color:red'>${this.searchText}</span>`
				)
			},
		},
		created() {},
	}
</script>
<style lang="less" scoped></style>
