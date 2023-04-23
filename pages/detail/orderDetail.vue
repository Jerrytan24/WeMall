<template>
	<view>
		<view class="confirm">
			<view class="info">
				<p>等待买家确认收货</p>
				<p>剩余20小时15分自动收货</p>
			</view>
			<image src="../../static/icon/orderDetail.png"></image>
		</view>
		<view class="place">
			<view class="place_info_01">
				<image src="../../static/icon/mail.png"></image>
			</view>
			<view class="place_info_02">
				<p>收获人：{{username+' '}}</p>
				<p>收货地址：广州市天河区</p>
			</view>
		</view>
		<view class="top" v-for="item in orderData" :key='item.id'>
			<view class="Jerry_top">
				<p>{{item.ordertime}}</p>
				<view class="info">
					<image :src="item.book_img"></image>
					<text class="infoText">{{item.book_name}}</text>
				</view>
			</view>
			<view class="Jerry_bottom">
				<view>
					总价格：<text>{{item.book_sum+' '}}</text>总数：<text>{{item.book_num}}</text>
					<text class="MyText1" @click="queren(item.id)">确认订单</text>
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
				orderData: [],
			}
		},
		methods: {
			queren(id) {
				uni.showModal({
					title: '确定收货嘛？',
					success(res) {
						if (res.confirm) {
							uni.request({
								url: 'http://localhost:8082/api/deleteOrder?id=' + id,
								success(res) {
									uni.switchTab({
										url: '../sell/sell'
									})
								}
							})
						} else {
							return;
						}

					}
				})
			}
		},
		onLoad(options) {
			let that = this;
			uni.request({
				url: 'http://localhost:8082/api/getOrderDetail?usernameId=' + that.usernameId + '&id=' + options
					.id,
				success(res) {
					that.orderData = res.data;
				}
			})
		},
		computed: {
			...mapState(['usernameId', 'username'])
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EEEEEE;
	}

	.confirm {
		width: 100%;
		height: 160rpx;
		background-image: linear-gradient(to right, #ff7a37, red);
		color: #FFFFFF;

		image {
			width: 60rpx;
			height: 60rpx;
			margin-top: 26px;
			margin-left: 300rpx;
		}

		.info {
			position: relative;
			top: 20rpx;
			display: inline-block;
		}
	}

	.place {
		margin-top: 10px;
		width: 100%;
		height: 160rpx;
		display: flex;
		flex-wrap: nowrap;
		line-height: 50rpx;
		background-color: #FFFFFF;

		.place_info_01 {
			image {
				width: 40px;
				height: 40px;
			}

			text {
				float: right;
			}
		}
	}

	.top {
		margin-top: 10px;
		background-color: #FFFFFF;
		width: 100%;
		height: 400rpx;

		.Jerry_top {
			height: 200rpx;
			width: 100%;
			background-color: #FFFFFF;

			p {
				color: #CCCCCC;
			}

			.info {
				margin-top: 10px;

				image {
					width: 120rpx;
					height: 120rpx;
					display: inline-block;
				}
				.infoText {
					position: absolute;
					font-size: 14px;
					color: #999999;
				}
			}
		}
		.Jerry_bottom {
			margin-top: 10px;
			height: 200rpx;
			width: 100%;
			clear: both;

			view {
				margin-top: 30px;
			}

			.MyText1 {
				display: inline-block;
				margin-left: 260rpx;
				width: 160rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				color: #ff4107;
				border: 1px solid #ff4107;
			}
		}
	}
</style>
