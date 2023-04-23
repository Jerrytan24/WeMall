<template>
	<view class="top">
		<fabu :list="list"></fabu>
	</view>
</template>

<script>
	import fabu from "@/components/fabuComponent.vue"
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				list: []
			}
		},

		methods: {
			async dataGet(id) {
				const res = await this.$JerryRequest({
					url: "/getBookUserByIndex?user_id=" + id,
					token: uni.getStorageSync("token")
				})
				this.list = res.data;
			}
		},
		onShow() {
			if (!uni.getStorageSync("username")) {
				return uni.showModal({
					title: '您还未登录',
					confirmText: '去登陆',
					showCancel: false,
					success(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '../profile/profile'
							})
						} else {
							uni.switchTab({
								url: '../profile/profile'
							})
						}
					}
				})
			} else {
				this.dataGet(uni.getStorageSync("id"));
			}
		},
		components: {
			fabu,
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #EEEEEE;
	}

	.myImg {
		background-color: white;
		margin-top: 5px;
		font-size: 20px;
	}

	.uni-list-cell {
		.uni-list-cell-left {
			background-color: white;
			font-size: 20px;
		}

		.uni-list-cell-db {
			margin-top: 5px;
			background-color: white;
			color: red;
			font-size: 20px;
		}

	}

	.Mytext {
		background-color: #FFFFFF;
		width: 100%;
		height: 150px;
		margin-top: 80px;
	}

	.btn {
		color: white;
		background-color: #0000ff;
		font-size: 20px;
	}

	.top {
		width: 100%;
		height: 50px;
		text-align: center;
		color: blue;
		font-size: 18px;
	}
</style>
