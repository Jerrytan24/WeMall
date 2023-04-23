<template>
	<view>

		<u-search :label="cate" placeholder="请输入书名或作者" @custom="custom" @search="search" @clickIcon="clickIcon"
			:animation="true" margin="0rpx 20rpx" v-model="keyword"></u-search>
		<book-list :JerryData="list" :JerryCollects="sellData"></book-list>
	</view>
</template>

<script>
	import bookList from "@/components/book_list/book_list.vue";
	export default {
		data() {
			return {
				keyword: '',
				list: [],
				sellData: '1',
				cate: "书名",
				cateArray: ['书名', '作者']
			}
		},
		methods: {
			custom() {
				let that = this;
				if (!this.keyword) {
					this.$Inter.JerryAlert("请输入想要查询的书籍")
					return;
				}
				this.$JerryRequest({
					url: "/getBookByVague?title=" + that.keyword+"&cate="+that.cate,
				}).then(res => {
					that.list = res.data;
				})
			},
			search(value) {
				let that = this;
				if (!this.keyword) {
					this.$Inter.JerryAlert("请输入想要查询的书籍")
					return;
				}
				this.$JerryRequest({
					url: "/getBookByVague?title=" + that.keyword+"&cate="+that.cate,
				}).then(res => {
					that.list = res.data;
				})
			},
			clickIcon() {
				let that = this;
				uni.showActionSheet({
					itemList: this.cateArray,
					success: function(res) {
						that.cate = that.cateArray[res.tapIndex];
					},
					fail: function(res) {
					}
				});
			},
		},
		components: {
			bookList,
		}
	}
</script>

<style lang="scss" scoped>
</style>
