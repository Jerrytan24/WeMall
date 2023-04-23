<template>
	<view>

		<!-- <button  @tap="masks()">确认收货</button> -->

		<!-- 密码框 -->
		<view v-if="JerryMask"
			style="width: 100%;height: 100%;position:fixed;background: rgba(0,0,0,0.4);top: 0;z-index: 9999;overflow: hidden;">
			<view :class="bott" class="masks">
				<view style="padding: 0 3%;">
					<view @tap="maskss()" style="float: left;font-size: 60upx;margin: -10upx 0 0 0;">×</view>
					<view style="text-align: center;font-size:30upx;padding-top: 3%;">请输入支付密码</view>
				</view>
				<view style="display: flex;width: 80%;margin:5% auto;text-align: center;">
					<view v-for="(item , index) in pasList" :key='index' style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-show="passwordArray.length > index"
								style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
				</view>
				<view style="display: flex;flex-wrap: wrap;text-align: center;">
					<view v-for="(num , indexs) in numbr " :key='indexs' @tap="passwordBox(num)" hover-class="hover"
						:hover-stay-time='20' class="password">
						{{num}}
					</view>
					<view @tap="reset()" class="password" style="background: #09BB07;color: #fff;">重置</view>
					<view @tap="passwordBox(0)" hover-class="hover" :hover-stay-time='20' class="password">0</view>
					<view @tap="backspace()" class="password" style="background: #09BB07;color: #fff;">删除</view>
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
				password: '',
				passwordArray: [],
				bott: '',
				pasList: ['', '', '', '', '', ''],
				numbr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				address: "广东省广州市中山大道西293号前面"
			}
		},
		// props: {
		// 	mask: {
		// 		type: Boolean,
		// 		default: false
		// 	}
		// },
		methods: {
			// 密码框
			passwordBox(num) {
				let now = new Date();
				let month = now.getMonth() + 1; //月
				let day = now.getDate();
				let temp = "";
				temp = month+"."+day;
				if (this.passwordArray.length < 6) {
					this.passwordArray.push(num)
				}
				if (this.passwordArray.length == 6) {
					// this.$emit('zhijie', '123')
					if (this.num > 0 && this.price > 0) {
						this.$api.insertUserOrder(uni.getStorageSync("bookId"), this.num, this.price, uni.getStorageSync(
								"id"), this.sellerId, uni.getStorageSync("username"), uni.getStorageSync("mobile"),
							this.address,temp);
						this.$Inter.JerryAlert("支付成功");
						this.$store.dispatch("setMask", false);
						this.$store.state.popShow = false;
					}
					if (this.tolist2.length > 0) {
						this.$api.insertUserOrderList(uni.getStorageSync("id"),this.tolist2);
						this.$Inter.JerryAlert("支付成功");
						this.$emit("sendToList", [])
						this.$store.dispatch("setMask", false);
					}
					this.passwordArray = [];
				}
			},
			reset() {
				this.passwordArray = []
			},
			backspace() {
				this.passwordArray.pop()
			},
			// masks() {
			// 	let _this = this
			// 	this.mask = true;
			// 	setTimeout(() => {
			// 		_this.bott = 'bot'
			// 	}, 50)
			// },
			maskss() {
				this.$store.dispatch('setMask', false)
				this.bott = ''
				this.passwordArray = []
			},
			// end
		},
		beforeUpdate() {
			let _this = this;
			setTimeout(() => {
				_this.bott = 'bot'
			}, 50)
		},
		computed: {
			...mapState(['JerryMask', 'usernameId'])
		},
		props: {
			num: {
				type: Number,
				default: 0
			},
			price: {
				type: Number,
				default: 0
			},
			tolist2: {
				type: Array,
				default: []
			},
			sellerId: {
				type: Number,
				default: 0
			}
		}

	}
</script>

<style>
	.password {
		width: 25%;
		flex-grow: 1;
		padding: 3%;
		font-size: 40upx;
		box-shadow: 0px 0px 1upx #ccc;
	}

	.hover {
		background: #eee;
	}

	.masks {
		bottom: -50%;
		position: fixed;
		background: #fff;
		width: 100%;
		transition: .5s
	}

	.bot {
		bottom: 0;
	}
</style>
