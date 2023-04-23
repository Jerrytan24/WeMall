<template>
	<view class="top">
		<view class="card" v-for="(item,index) in list" :key="item.id">
			<view class="image">
				<image :src="item.image" @error="Error(index)"></image>
			</view>
			<view class="info">
				<p class="title">书名：{{item.title}}</p>
				<p class="author">作者：{{item.author}}</p>
				<view class="bookPrice">
					<view class="price">
						<p>¥{{(item.price*item.num).toFixed(2)}}</p>
					</view>
					<view class="num">
						<p>数量：×{{item.num}}</p>
					</view>
				</view>
				<view class="operate">
					<u-button class="uButton" @click="refundItem(item.orderId,index)" type="primary" text="收货" size="mini"></u-button>
				</view>
			</view>
		</view>
		<u-modal :show="show" showCancelButton :title="title" @confirm="comfirm" @cancel="cancel">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
		<popup :show="popShow" :complete_id="popComplete_id" :book_id="popBook_id"></popup >
	</view>
</template>

<script>
	import popup from "@/components/bookOrderPopup.vue"
	export default {
		data() {
			return {
				show: false,
				title: '删除订单',
				content: "是否确认删除订单",
				deleteIndex:0,
				popShow:false,
				complete_id:0,
				popComplete_id:0,
				popBook_id:0,
			}
		},
		props: {
			list: {
				type: Array || Object,
				required: true,
				default: [],
			}
		},
		methods: {
			cancel(){
				this.show = false;
			},
			comfirm(){
				this.show = false;
				let that = this;
				let book_id = this.list[this.deleteIndex].id;
				let num = this.list[this.deleteIndex].num;
				let price = this.list[this.deleteIndex].price;
				let sellerId = that.list[this.deleteIndex].sellerId;
				let user_id = uni.getStorageSync("id");
				this.$JerrySecond({
					url: "/insertUserOrderComplete",
					data: {
						book_id: book_id,
						num: num,
						price: price,
						user_id: user_id,
						seller_id: sellerId,
					},
					token: uni.getStorageSync("token"),
				}).then(res => {
					this.$Inter.JerryAlert('收货成功');
				})
				this.$JerryRequest({
					url:"/deleteOrderFaHuo?order_id="+that.complete_id,
					token:uni.getStorageSync("token"),
					method:"DELETE"
				})
				that.list.splice(this.deleteIndex, 1);
			},
			refundItem(id,index){
				this.complete_id = id;
				this.deleteIndex = index;
				this.show = true;
			},
			Error(index) {
				this.list[index]['image'] = '../../static/nofound.jpg'
			}
		},
		components:{
			popup,
		}
	}
</script>

<style lang="scss">
	.operate {
		width: 20%;
		height: 46rpx;
		text-align: right;
		position: absolute;
		bottom: 0;
		right: 0px;
		.uButton {
			width: 100%;
		}
	}

	.bookPrice {
		width: 100%;
		height: 66rpx;
		display: flex;
	}

	.num {
		color: #b4b4b4;
		font-size: 13px;
		margin-top: 4px;
		margin-left: 50%;
	}

	.top {
		background-color: #EEEEEE;
	}

	.card {
		display: flex;
		background-color: #FFFFFF;
		height: 230rpx;
		margin-bottom: 10px;
		position: relative;
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
			margin-top: 4px;
			color: #ff0000;
		}
	}
</style>
