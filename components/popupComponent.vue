<template>
	<view>
		<view>
			<u-popup :show="popShow" :round="10" mode="bottom" @close="close" @open="open">
				<view class="mypop">
					<view class="ordertitle">确定订单</view>
					<view class="infoText">
						<view class="image">
							<image :src="bookImage"></image>
						</view>
						<view class="price">￥{{bookPrice}}</view>
						<view class="icon" @click="closePop">
							<u-icon name="close-circle" color="#d0d0d0" size="24"></u-icon>
						</view>
					</view>
					<view class="address">
						<view class="icon1">
							<u-icon name="map" color="#d0d0d0" size="28"></u-icon>
						</view>
						<view class="userAddress">
							<view class="city">广东省，广州市，天河区</view>
							<view class="cityInfo">中山大道西293号</view>
						</view>
						<view class="icon2">
							<u-icon name="arrow-right" color="#d0d0d0" size="28"></u-icon>
						</view>
					</view>
					<view class="num">
						<view class="numLeft flexCenter">
							￥{{parseFloat(bookPrice*number).toFixed(2)}} 
						</view>
						<view class="numRight">
							<view class="reduce flexCenter" @click="reduce">-</view>
							<view>{{number}}</view>
							<view class="increace flexCenter" @click="increace">+</view>
						</view>
					</view>
					<view class="bottom">
						<u-button type="error" text="确定" @click="submit"></u-button>
					</view>
				</view>
				<spend-money :num="number" :sellerId="sellerId" :price="bookPrice*number"></spend-money>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import spendMoney from "@/components/spendMoney/index.vue"
	import {
		mapState
	} from "vuex"
	export default {
		name: "popupComponent",
		data() {
			return {
				number: 1,
			}
		},
		methods: {
			submit(){
				if(this.number <=0){
					this.number = 1;
					this.$store.state.popShow = false;
				}else{
					this.$store.dispatch("setMask",true);
				}
			},
			reduce() {
				if (this.number < 1) {
					this.$Inter.JerryAlert("已不能减了")
				}
				else if (this.number > this.bookNum) {
					this.$Inter.JerryAlert("已大于最大售货量")
				}
				else {
					this.number--;
				}
			},
			increace() {
				if (this.number === this.bookNum) {
					this.$Inter.JerryAlert("已大于最大售货量")
				}else{
					this.number++;
				}
			},
			closePop() {
				this.$store.state.popShow = false;
			},
			open() {
				// console.log('open');
			},
			close() {
				this.$store.state.popShow = false
				// console.log('close');
			}
		},
		props: {
			show: {
				type: Boolean
			},
			bookImage: {
				type: String
			},
			bookPrice: {
				type: Number
			},
			bookNum: {
				type: Number
			},
			sellerId:{
				type:Number
			}
		},
		computed: {
			...mapState({
				'popShow': 'popShow'
			}, {
				'currentImage': 'currentImage'
			})
		},
		components:{
			spendMoney,
		}
	}
</script>

<style lang="scss" scoped>
	.infoText {
		background-color: #FFFFFF;
		width: 100%;
		height: 110rpx;
		display: flex;
		margin-bottom: 3px;

		.image {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 100rpx;
				height: 110rpx;
			}
		}

		.price {
			display: flex;
			flex: 10;
			align-items: center;
			color: #ff0000;

		}

	}

	.ordertitle {
		background-color: #FFFFFF;
		width: 100%;
		height: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.address {
		background-color: #FFFFFF;
		height: 110rpx;
		width: 100%;
		display: flex;
		margin-bottom: 2px;

		.icon1 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 1;
		}

		.icon2 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 1;
		}

		.userAddress {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 5;
		}
	}

	.num {
		display: flex;
		width: 100%;
		background-color: #FFFFFF;
		height: 80rpx;

		.numRight {
			display: flex;
			margin-top: 8px;
			flex: 8;
			font-size: 16px;
			justify-content: flex-end;
			.reduce {
				margin-right: 10px;
				font-size: 16px;
				width: 40rpx;
				height: 40rpx;
				border: 1px solid;
				
			}
			.increace {
				margin-left: 10px;
				font-size: 16px;
				width: 50rpx;
				width: 40rpx;
				height: 40rpx;
				border: 1px solid;
			}
		}

		.numLeft {
			color: #ff0000;
			font-size: 18px;
			font-weight: 600;
			flex: 2;
		}

	}
	.bottom {
		position: fixed;
		bottom: 0%;
		left: 0%;
		width: 100%;
	}

	.mypop {
		width: 100%;
		height: 1200rpx;
		background-color: #EEEEEE;
	}
</style>
