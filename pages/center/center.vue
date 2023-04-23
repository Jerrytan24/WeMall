<template>
	<view class="u-page">
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<view class="album" v-for="(item,index) in list" @click="dynamic(item.textId)">
					<view class="album__avatar">
						<image :src="item.userImage" mode="" style="width: 32px;height: 32px;"></image>
					</view>
					<view class="album__content">
						<u--text :text="item.username" type="primary" bold size="17"></u--text>
						<u--text margin="0 0 8px 0" :text="item.text"></u--text>
						<image :src="item.image" mode="widthFix" class="myImg"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				albumWidth: 0,
				list: [],
			}
		},
		components: {},
		computed: {},
		methods: {
			dynamic(id){
				uni.navigateTo({
					url:"centerDetail?id="+id
				})
			},
			async dataGet() {
				const res = await this.$JerryRequest({
					url: "/getMessage",
					token:uni.getStorageSync("token")
				})
				this.list = res.data;
				// console.log(this.list)
			}
		},
		onShow() {
			if (!uni.getStorageSync("username")) {
				uni.showModal({
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
			}
			this.dataGet()

		}
	}
</script>
<style lang="scss">
	.myImg {
		width: 300rpx;
		height: 250rpx;
	}

	.album {
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 5px;
			border-radius: 3px;
		}

		&__content {
			margin-left: 10px;
			flex: 1;
		}
	}
</style>
