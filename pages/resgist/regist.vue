<template>
	<view class="sun-index">
		<view class="sun-logo-box">
			<view class="sun-logo">
				<image class="sun-icon-img" src="../../static/logo.png" />
			</view>
		</view>
		<view class="sun-login-box">
			<view class="sun-label">
				<image style="width: 28rpx;height:39rpx;" src="../../static/profile.png" />
				<text class="label-text">用户名</text>
			</view>
			<view class="sun-input-box">
				<input v-model="user" maxlength="10"  @blur="usernameCheck" type="text" placeholder="请输入用户名"
					placeholder-class="placeholder-class" />
				<image @click="user=''" class="close-icon" src="../../static/imgs/close_icon.png" />
			</view>
		</view>
		<view class="sun-login-box">
			<view class="sun-label">
				<image style="width: 28rpx;height:39rpx;" src="../../static/imgs/mobile_icon.png" />
				<text class="label-text">手机</text>
			</view>
			<view class="sun-input-box">
				<input v-model="mobile" @blur="leaveMobile" type="number" placeholder="请输入手机" placeholder-class="placeholder-class" />
				<image @click="mobile=''" class="close-icon" src="../../static/imgs/close_icon.png" />
			</view>
		</view>
		<view class="sun-login-box">
			<view class="sun-label">
				<image style="width: 29rpx;height:37rpx;" src="../../static/imgs/pwd_icon.png" />
				<text class="label-text">密码</text>
			</view>
			<view class="sun-input-box">
				<input v-model="password" type="password" placeholder="请输入密码" placeholder-class="placeholder-class" />
				<image @click="password=''" class="close-icon" src="../../static/imgs/close_icon.png" />
			</view>
		</view>
		<view class="sun-login-box">
			<view class="sun-label">
				<image style="width: 29rpx;height:37rpx;" src="../../static/imgs/pwd_icon.png" />
				<text class="label-text">请再次输入密码</text>
			</view>
			<view class="sun-input-box">
				<input @blur="leavePassword2" v-model="password2" type="password" placeholder="请再次输入密码" placeholder-class="placeholder-class" />
				<image @click="password2=''" class="close-icon" src="../../static/imgs/close_icon.png" />
			</view>
		</view>
		<view class="login-btn-box">
			<view class="login-btn" @click="handleSubmit">注册</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				password: '',
				password2: "",
				code: '',
				countTime: 60,
				currentCountTime: 0,
				showTime: false,
				timeId: null,
				user: '',
				inserUser_data: [],
			}
		},
		created() {
			this.currentCountTime = this.countTime
		},
		onLoad() {},
		methods: {
			leaveMobile(){
				let that = this;
				if(this.mobile === "") return ;
				if(this.mobile.length < 7){
					this.$Inter.JerryAlert("电话过短");
					return ;
				}
				this.$JerryRequest({
					url:"/checkPhoneByUser?mobile="+that.mobile
				}).then(res => {
					if(res.data.reqstatus == true){
						that.$Inter.JerryAlert("电话号码已注册了");
						that.mobile = "";
						return ;
					}
				})
			},
			leavePassword2(){
				if(this.password2 === "") return ;
				if(this.password2 !== this.password){
					this.$Inter.JerryAlert("前后密码不一致");
					this.password2 = "";
					return ;
				}
			},
			handleSubmit() {
				let that = this;
				if (!this.mobile) return uni.showToast({
					title: '请输入电话号码',
					icon: 'none',
					duration: 1500
				})
				if (!this.password || !this.password2) return uni.showToast({
					title: '请输入密码',
					icon: 'none',
					duration: 1500
				})
				if (this.mobile.length < 8 || this.mobile.length > 12) return uni.showToast({
					title: '手机号应在8-12位',
					icon: 'none',
					duration: 1500
				})
				if (this.password.length < 8 || this.password.length > 12) return uni.showToast({
					title: '密码应在8-12位',
					icon: 'none',
					duration: 1500
				})
				if (this.user.length < 3 || this.user.length > 10) return uni.showToast({
					title: '用户名要在2位至10位之间',
					icon: 'none',
					duration: 1500
				})
				
				this.$JerrySecond({
					url: "/regist",
					data: {
						user: that.user,
						mobile: that.mobile,
						password: that.password
					}
				}).then(res => {
					console.log(res.data)
					if (JSON.stringify(res.data) !== '1') {
						return uni.showToast({
							title: '手机号已被注册'
						})
					}else {
						uni.showToast({
								title: '注册成功'
							}),
							uni.reLaunch({
								url: '../login/login'
							})
					}
				}).catch(err => {
					console.log(err);
					uni.showToast({
						title: '注册失败',
						duration: 2500
					})
				})
			},
			usernameCheck() {
				let that = this;
				if(this.user === "") return ;
				if(this.user.length < 3){
					this.$Inter.JerryAlert("用户名长度过短");
					return ;
				}
				this.$JerryRequest({
					url:"/checkUsername?username="+that.user,
				}).then((res) => {
					if(res.data.reqstatus == true){
						that.$Inter.JerryAlert("用户名已被注册");
						that.user = "";
					}
				})
			},
			handleGetCodeClick() {
				this.showTime = true
				if (this.showTime && this.currentCountTime !== this.countTime) return
				this.currentCountTime
				this.timeId = setInterval(() => {
					if (this.currentCountTime <= 0) {
						this.currentCountTime = this.countTime
						this.showTime = false
						clearInterval(this.timeId)
					}
					this.currentCountTime--
				}, 1000)
			}
		}
	}
</script>

<style scoped>
	.sun-logo-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 300rpx;
	}

	.sun-icon-img {
		width: 120rpx;
		height: 120rpx;
	}

	.sun-logo {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 180rpx;
		height: 180rpx;
		border-radius: 15rpx;
		background-color: #ff510a;
		box-shadow: 0rpx 0rpx 30rpx rgba(18, 200, 185, 0.5);
	}

	.close-icon {
		width: 36rpx;
		height: 34rpx;
	}

	.sun-login-box {
		padding: 20rpx 60rpx;
	}

	.sun-label {
		display: flex;
		align-items: center;
	}

	.label-text {
		margin-left: 16rpx;
		font-weight: 500;
		color: #272e2d;
		font-size: 30rpx;
	}

	.sun-input-box {
		display: flex;
		align-items: center;
		height: 100rpx;
		border-bottom: 1rpx solid #eee;
		padding: 0px 10rpx;
	}

	.sun-input-box input {
		flex: 1;
	}

	.placeholder-class {
		font-size: 30rpx;
		color: #C0C0C0;
	}

	.sun-tip {
		display: flex;
		justify-content: space-between;
		padding: 0rpx 68rpx;
	}

	.sun-tip-text {
		color: #30C6B3;
	}

	.login-btn-box {
		position: absolute;
		bottom: 129rpx;
		left: 0;
		bottom: 40px;
		width: 100%;
		padding: 50rpx 68rpx 0rpx;
	}

	.login-btn {
		height: 82rpx;
		width: 80%;
		border-radius: 41rpx;
		background-color: #ff510a;
		box-shadow: -1px 12px 11px 0px rgba(16, 170, 157, 0.4);
		text-align: center;
		line-height: 82rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #fff;
	}

	.code-text {
		font-size: 28rpx;
		color: #30C6B3;
	}

	.gray {
		color: #C0C0C0;
	}
</style>
