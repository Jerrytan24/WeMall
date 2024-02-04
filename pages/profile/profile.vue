<template>
	<view class="head">
		<view class="profile" v-show="Islogin">
			<image :src="userImage" class="image"></image>
			<view class="jerry">
				<text>{{usernameStorage}}</text>
				<text>中国社会大学</text>
			</view>
			<!-- <image src="https://gitee.com/jerry-mall/static/raw/master/images/pen.png" class="image0"></image> -->
		</view>
		<view v-show="!Islogin" class="profile profile2">
			<button type="default"  @click="login">立即登录</button>
		</view>
		<view class="infomation" @click="">
			<ul>
				<li class="myli_01">
					<text class="text">我的发布</text>
					<view class="li_flex">
						<view class="icon_01" @click="myshow">
							<image src="../../static/profile/bysell.png"></image>
				<li>
					<text>订单中心</text>
				</li>
		
		</view>
	<view class="icon_01" @click="xiajia">
		<image src="../../static/profile/upload.png"></image>
		<li>
			<text>已发布</text>
		</li>
	</view>
	<view class="icon_01" @click="shouchu">
		<image src="../../static/profile/yishouchu.png"></image>
		<li>
			<text>已售出</text>
		</li>
	</view>
	</view>
	</li>
	<li class="my" style="margin-top:50rpx;" @click="mycollect">
		<image src="../../static/profile/mycollect.png"></image>
		<text>我的收藏</text>
		<view class="square">
		</view>
	<li class="my" @click="mypaper">
		<image src="../../static/profile/zhitiao.png"></image>
		<text>我扔的纸条</text>
		<view class="square" style="margin-left: 464rpx;">
		</view>
	</li>
	<li class="my" @click="myadvice">
		<image src="../../static/profile/yijianfankui.png"></image>
		<text>需求中心</text>
		<view class="square">
		</view>
	</li>
	<li class="my" @click="myabout">
		<image src="../../static/profile/guanyuwom.png"></image>
		<text>聊天信息</text>
		<view class="square">
		</view>
	</li>
	</ul>
	</view>
	<view class="bottom" v-if="Islogin" @click="unistall">
		<text>退出登录</text>
	</view>
	<view class="footer">
		<text>JerryTan亲手开发</text>
	</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				Islogin: false,
				userImage: "",
				usernameStorage: "",
			};
		},
		onLoad() {
		},
		methods: {
			mycollect: function() {
				if (!uni.getStorageSync("username")) {
					uni.showModal({
						title: "您还未登录",
						showCancel: false
					})
					return;
				} else {
					uni.navigateTo({
						url: '../collect/collect',
					})
				}

			},
			mypaper: function() {
				if (!uni.getStorageSync("username")) {
					uni.showModal({
						title: "您还未登录",
						showCancel: false
					})
					return;
				}
				uni.navigateTo({
					url:"../mypaper/mypapered"
				})
			},
			myadvice: function() {
				if (!uni.getStorageSync("username")) {
					uni.showModal({
						title: "您还未登录",
						showCancel: false
					})
					return;
				}else{
					uni.navigateTo({
						url:'../center/center'
					})
				}
			},
			myabout: function() {
				uni.navigateTo({
					url: "../aboutwe/aboutwe"
				})
			},
			myshow: function() {
				if (!uni.getStorageSync("username")) {
					uni.showModal({
						title: "您还未登录",
						showCancel: false
					})
					return;
				}
				uni.navigateTo({
					url:'../myOrder/myOrder'
				})
			},
			xiajia: function() {
				if (!uni.getStorageSync("username")) {
					uni.showModal({
						title: "您还未登录",
						showCancel: false
					})
					return;
				}else {
					uni.navigateTo({
						url:"../myfabu/myfabu"
					})
				}
			},
			shouchu: function() {
				if (!uni.getStorageSync("username")) {
					uni.showModal({
						title: "您还未登录",
						showCancel: false
					})
					return;
				}
				uni.navigateTo({
					url:"../solded/index"
				})
			},
			login: function() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			unistall() {
				let that = this;
				// uni.removeStorage({
				// 	key:'username',
				// 	success() {
				// 		uni.showToast({
				// 			title:'登出成功'
				// 		})
				// 		that.Islogin = false;
				// 	}
				// })
				that.$store.dispatch('user', "");
				that.$store.dispatch("userId","")
				if(this.username === ''){
					uni.removeStorageSync("username");
					uni.removeStorageSync("image");
					uni.removeStorageSync("mobile");
					uni.removeStorageSync("id");
					uni.removeStorageSync("token");
					uni.showToast({
						title: '登出成功'
					})
					this.Islogin = false;
				}else{
					return uni.showToast({
						title:'登出失败'
					})
				}
			}
		},
		beforeMount() {
			let that = this;
			if (uni.getStorageSync("username") !== "") {
				this.usernameStorage = uni.getStorageSync("username"); 
				that.Islogin = true;
				that.userImage = uni.getStorageSync("image")
			} else {
				that.Islogin = false;
			}
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		computed: {
			...mapState({
				'username': 'username'
			}, {
				'usernameId': 'usernameId'
			})
		},
		
	};
</script>

<style lang="scss">
	page {
		background-color: #eee;
	}

	.profile2 {
		text-align: center;

		button {
			transform: translateY(230rpx/2-80rpx/2);
			width: 400rpx;
			border-radius: 200rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background-color: $uni-theme;
			color: white;
			font-size: 13px;
		}
	}

	.profile {
		background-color: white;
		width: 100%;
		height: 230rpx;
		line-height: 230rpx;

		view {
			display: inline-block;
		}

		.image0 {
			width: 65rpx;
			height: 65rpx;
			margin-left: 200rpx;
		}

		.jerry {
			display: inline-block;
			margin-left: 35rpx;
			position: relative;

			text:nth-child(2) {
				color: #afafaf;
				font-size: 12rpx;
				position: relative;
				top: 46rpx;
				left: -76rpx;
			}
		}

		.image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 75rpx;
			overflow: hidden;
			vertical-align: middle;
		}
	}

	ul li {
		list-style: none;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	.infomation {
		margin-top: 20rpx;
		background-color: white;
	}

	.myli_01 {
		.text {
			font-size: 13rpx;
			margin-left: 55rpx;
		}

		.li_flex {
			margin-left: 70rpx;
			display: flex;
			flex: 1;
			margin-top: 15rpx;

			image {
				width: 110rpx;
				height: 110rpx;
			}

			view {
				width: 32%;
			}

			.icon_01 li {
				margin-left: 17rpx;

				text {
					font-size: 13px;
				}
			}
		}
	}

	.my {
		height: 80rpx;
		line-height: 80rpx;
		width: 100%;
		border-bottom: 1px solid #eee;

		image {
			margin-left: 55rpx;
			width: 30rpx;
			height: 30rpx;
			vertical-align: middle;
		}

		text {
			margin-left: 25rpx;
			font-size: 13px;
			color: #a7a7a7;
		}

		.square {
			display: inline-block;
			border: 1px solid #a7a7a7;
			border-bottom: 0px;
			border-left: 0px;
			width: 20rpx;
			height: 20rpx;
			transform: rotate(45deg);
			margin-left: 490rpx;
		}
	}

	.bottom {
		margin-top: 20rpx;
		line-height: 80rpx;
		text-align: center;
		height: 80rpx;
		background-color: white;
		width: 100%;

		text {
			font-size: 13px;
			color: #a7a7a7;
		}
	}

	.footer {
		margin-top: 20rpx;
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;

		text {
			font-size: 11px;
			color: #a7a7a7;
		}
	}
</style>
