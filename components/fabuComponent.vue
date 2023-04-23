<template>
	<view class="top">
		<u-swipe-action>
			<u-swipe-action-item :options="options" v-for="(item,index) in list" :key="item.id"
				@click="tap(index,item.id)">
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
		name: "fabuComponent",
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				options: [{
					text: '下架',
					style: {
						backgroundColor: '#f9ae3d',
					}
				}, ],
				show: false,
				title: "下单",
				content: "是否下单",
				book_id: 0,
				price: 0,
				bookIndex: 0,
			};
		},
		props: {
			list: {
				type: Array | Object,
				required: true,
				default: []
			}
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				// console.log(e)
				// this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// this.scrollTop = this.old.scrollTop
				// this.$nextTick(() => {
				// 	this.scrollTop = 0
				// });
				// uni.showToast({
				// 	icon: "none",
				// 	title: "纵向滚动 scrollTop 值已被修改为 0"
				// })
			},
			Error(index) {
				this.list[index]['image'] = '../../static/nofound.jpg'
			},
			tap(index, id) {
				this.$JerryRequest({
					url: "/deleteBookByUserIndex?id=" + id,
					method: "DELETE",
					token: uni.getStorageSync("token"),
				})
				this.list.splice(index, 1);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.scroll-Y {
		height: 1500px;
	}

	.top {
		background-color: #EEEEEE;
		height: 1500px;
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
		text-align: left;

		.title {
			margin-bottom: 5px;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			margin-top: 3px;
			font-size: 14px;
			color: #000000;
			font-weight: 600;
		}

		.author {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
			color: #000000;
			font-size: 15px;
			margin-top: 10px;
		}

		.price {
			margin-top: 6px;
			color: #ff0000;
		}
	}
</style>
