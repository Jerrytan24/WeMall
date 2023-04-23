<template>
	<view>
		<view class="notGoods" v-if="show == false">
			<image src="" mode="widthFix" style="width: 400rpx;"></image>
			<view class="notGoods-text">
				购物车暂无商品
			</view>
			<view class="notGoods-button" @click="placeOrder">
				去下单
			</view>
		</view>
		<view v-if="show == true">
			<!-- <view class="goods" v-for="(item,index) in goods" :key="index"> -->
			<!-- <view class="goods-top">
                    <view class="name">
                        {{item.name}}
                    </view>
                    <image src="../../static/del.png" mode="widthFix" style="width: 30rpx;" @click="delht"></image>
                </view> -->
			<view class="goods-detail" v-for="(item,index) in list" :key="index">
				<view class="detail-left">
					<view class="left">
						<checkbox-group @change="selected(item)">
							<checkbox class="xuanzhong" color="#E36452" :checked="checked" />
						</checkbox-group>
						<image :src="item.image" mode="widthFix" style="width: 150rpx;" @error="ErrSrc(index)"></image>
					</view>
					<view class="size">
						<text style="font-size: 25rpx;" class="bookName">书名：{{item.title}}</text>
						<view class="moddleView">
							<view class="price"><text
									class="goods-price">￥{{parseFloat(item.price*item.num).toFixed(2)}}/本</text></view>
							<view class="numInfo">
								<text class="subtract" @click="reduce(item)">-</text>
								<text class="num">{{item.num}}</text>
								<text @click="add(item)" class="add">+</text>
							</view>
						</view>
					</view>
				</view>
				<view class="right">
					<image src="@/static/del.png" mode="widthFix" style="width: 35rpx;" @click="delht(item,index)">
					</image>
				</view>
			</view>
		</view>
		<view class="end">
			<view class="end-left">
				<checkbox-group @change="selectedall()">
					<checkbox class="" :checked="allchecked" />全选
				</checkbox-group>
				<view>总计:<text style="color: #f00;font-weight: bold;">￥ {{totalPrice}}</text></view>
			</view>
			<view class="end-right" @click="payment">
				结算({{totalNum}})
			</view>
		</view>
		<spend-money :tolist2="tolist" @sendToList="getToList"></spend-money>
	</view>
</template>
<script>
	import {
		mapState
	} from "vuex";
	import spendMoney from "@/components/spendMoney/index.vue"
	export default {
		beforeMount() {
			this.list = uni.getStorageSync("bookList")
		},
		data() {
			return {
				show: true,
				allchecked: true,
				checked: true, 
				tolist: [],
				list:[],
			}
		},
		beforeCreate(){
			
		},
		methods: {
			getToList(item) {
				this.tolist = item;
				this.checked = false;
				this.allchecked = false; 
			},
			payment() {
				this.list.map(item => {
					if (item.flag) {
						this.tolist.push(item)
					}
				})
				this.$store.dispatch('setMask', true);
				
			},
			ErrSrc(index) {
				this.list[index]['image'] = '../../static/nofound.jpg'
			},
			placeOrder() {
				uni.navigateTo({
					url: '../order/index'
				})
			},
			delht(item, index) {
				// this.size.splice(index, 1)
				uni.showModal({
					content: '是否删除此商品',
					success: (res) => {
						if (res.confirm) {
							this.$JerryRequest({
								url: "/deleteUserCart?book_id=" + item.id,
								method: "DELETE"
							})
							this.list.splice(index, 1);
							this.$Inter.JerryAlert("删除成功")
							if (this.list.length == 0) {
								this.show = false
							}
						} else if (res.cancel) {

						}
					}
				})
			},
			change(e) {
				console.log(e)
			},
			selected(item) {
				item.flag = !item.flag
				if (!item.flag) {
					this.allchecked = false
				} else {
					const test = this.list.every(item => {
						return item.flag === true
					})
					if (test) {
						this.allchecked = true
					} else {
						this.allchecked = false
					}
				}
				// this.checked=!this.checked
				// this.totalNum()
			},
			selectedall() {
				this.allchecked = !this.allchecked
				if (this.allchecked) {
					this.list.map(item => {
						this.checked = true
						item.flag = true
					})
				} else {
					this.checked = false
					this.list.map(item => {
						item.flag = false

					})
				}
			},
			reduce(item) {
				let num = item.num
				// item.num = num-1
				// if(num <=0){
				//  return;
				// }
				if (num > 0) {
					num -= 1
				} else {
					num = 0
					return;
				}
				item.num = num
			},
			add(item) {
				let num = item.num
				if (num >= item.number) {
					this.$Inter.JerryAlert("超过最大售卖量")
				} else {
					item.num++;
				}
			}
		},
		// props: {
		// 	list: {
		// 		type: Array,
		// 		default: []
		// 	}
		// },
		computed: {
			...mapState({
				"usernameId": "usernameId"
			}, ),
			//计算选中商品的总价
			totalNum() {
				let totalNum = 0;
				this.list.map(item => {
					item.flag ? totalNum += item.num : totalNum += 0
				})
				return totalNum
			},
			totalPrice() {
				let totalPrice = 0;
				this.list.map(item => {
					item.flag ? totalPrice += parseInt(item.num * item.price) : totalPrice += 0
				})
				return totalPrice
			}
		},
		components: {
			spendMoney,
		}
	}
</script>
<style lang="scss">
	.moddleView {
		display: flex;

		.price {}

		.numInfo {
			margin-left: 20px;

			text {
				width: 50rpx;
				line-height: 50rpx;
				text-align: center;
				display: inline-block;
				background-color: #F7F7F7;
				margin-right: 10rpx;
			}

			.add {
				color: #FA4305;
				border-radius: 10rpx 30rpx 30rpx 10rpx;
				margin-right: 20rpx;
			}

			.subtract {
				border-radius: 30rpx 10rpx 10rpx 30rpx;
			}
		}
	}






	.bookName {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.goods {
		line-height: 80rpx;
		background-color: #fff;

		&-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			border-bottom: 8rpx solid #F1F1F1;

			.name {
				color: #333;
				font-size: 31rpx;
				font-weight: bold;
			}
		}

		&-detail {
			display: flex;
			padding: 30rpx 15rpx 30rpx 30rpx;
			background-color: #fff;
			justify-content: space-between;
			border-bottom: 5rpx solid #F1F1F1;
			align-items: center;

			.detail-left {
				display: flex;

				.left {
					display: flex;
					align-items: center;
				}
			}

			.size {
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				margin-left: 30rpx;

				.goods-price {
					font-size: 25rpx;
					color: #F44545;

				}
			}

			.right {}
		}

	}

	.notGoods {
		position: relative;
		top: 220rpx;
		text-align: center;
		display: flex;
		align-items: center;
		flex-direction: column;

		// line-height: 1334rpx;
		&-text {
			color: #808080;
			margin-bottom: 50rpx;
		}

		&-button {
			width: 260rpx;
			height: 70rpx;
			color: #F44545;
			border: 1rpx solid #F44545;
			text-align: center;
			line-height: 70rpx;
			border-radius: 48rpx;
		}
	}

	.end {
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		position: fixed;
		bottom: 100rpx;
		left: 0;
		display: flex;
		align-items: center;

		&-left {
			width: 70%;
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;

			.end-flex {
				display: flex;
				align-items: center;
			}
		}

		&-right {
			width: 30%;
			line-height: 90rpx;
			background-color: #F44545;
			text-align: center;
			color: #fff;
		}
	}
</style>
