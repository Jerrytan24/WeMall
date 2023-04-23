<template>
	<view class="top">
		<u-swipe-action>
			<u-swipe-action-item :options="options" v-for="(item,index) in list" :key="item.id"
				@click="tap(index,item.completeId)">
				<view class="swipe-action u-border-top" :class="[index === list.length - 1 && 'u-border-bottom']">
					<view class="swipe-action__content card">
						<view class="image">
							<image :src="item.image" @error="Error(index)"></image>
						</view>
						<view class="info">
							<p class="title">书名：{{item.title}}</p>
							<p class="author">作者：{{item.author}}</p>
							<p class="price">¥{{item.price}}</p>
						</view>
					</view>
				</view>
			</u-swipe-action-item>
		</u-swipe-action>
	</view>
</template>

<script>
	export default {
		name: "sellerComplete",
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#f9ae3d',
					}
				}, ],
			};
		},
		props: {
			list: {
				type: Array || Object,
				required: true,
				default: []
			},
		},
		methods: {
			Error(index) {
				this.list[index]['image'] = '../../static/nofound.jpg'
			},
			tap(index, collectId) {
				this.$JerryRequest({
					url: "/deleteCompleteByseller?complete_id=" + collectId,
					method: "DELETE",
					token:uni.getStorageSync("token")
				})
				this.list.splice(index, 1);
			},
		},
	}
</script>

<style lang="scss">
	.slot {
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		color: #000000;
	}

	.top {
		background-color: #EEEEEE;
	}

	.card {
		display: flex;
		background-color: #FFFFFF;
		height: 230rpx;
		margin-bottom: 10px;
	}

	.image {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			height: 200rpx;
			width: 200rpx;
		}

		flex: 1;

	}

	.info {
		flex: 2;

		.title {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			margin-top: 3px;
			font-size: 14px;
			font-weight: 800;
		}

		.author {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
			margin-top: 4px;
		}

		.price {
			margin-top: 6px;
			color: #ff0000;
		}
	}

	.u-page {
		padding: 0;
	}

	.u-demo-block__title {
		padding: 10px 0 2px 15px;
	}

	.swipe-action {
		&__content {
			padding: 25rpx 0;

			&__text {
				font-size: 15px;
				color: $u-main-color;
				padding-left: 30rpx;
			}
		}
	}
</style>
