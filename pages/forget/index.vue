<template>
	<view>
		<view class="input">
			<u--input placeholder="请输入电话号码" type="number" @blur="leaveMobile" maxlength=12 border="surround" v-model="mobile" @change="changeMobile" clearable>
			</u--input>
		</view>
		<view class="wrap">
			<u-toast ref="uToast"></u-toast>
			<u-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-code>
			<u-button type="primary" :disabled="isDisable" @tap="getCode">{{tips}}</u-button>
		</view>
		<view class="certify">
			<u-code-input class="certigyInput" v-model="value3" @change="change" @finish="finish" :maxlength="6">
			</u-code-input>
		</view>
		<tfgg-verify @result='verifyResult' ref="verifyElement"></tfgg-verify>
	</view>
</template>

<script>
	var this_;
	var intv;
	import tfggVerify from "@/components/tfgg-verify/tfgg-verify.vue";
	export default {
		data() {
			return {
				tips: '',
				// refCode: null,
				seconds: 50,
				mobile: "",
				isDisable: true,
				value3: "",
				code: "",
				sin:0,
				statusBarHeight:'',//状态栏高度
				personCheck:false,
			}
		},
		components: {
			"tfgg-verify":tfggVerify
		},
		onLoad(e) {
			this_ = this;
			uni.getSystemInfo({
				success: res=>{
					this.statusBarHeight = res.statusBarHeight + 'px';
				}
			})
		},
		onUnload() {
			if(intv){
				clearInterval(intv);
			}
		},
		methods: {
			verifyResult(res){
				if(res){
					this.$refs.verifyElement.reset();//校验成功重置插件
					this.isDisable = true;
					let that = this;
					setTimeout(() => {
						that.isDisable = false;
					}, 52000)
					if (this.$refs.uCode.canGetCode) {
						// 模拟向后端请求验证码
						uni.showLoading({
							title: '正在获取验证码'
						})
						setTimeout(() => {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							uni.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}, 2000);
					} else {
						uni.$u.toast('倒计时结束后再发送');
					}
				}
			},
			verifyFasong(){
				if(this.sin>0){
					return;
				}
				this.$refs.verifyElement.show();
			},
			/* 校验插件重置 */
			verifyReset(){
				this.$refs.verifyElement.reset();
			},
			leaveMobile(){
				let that = this;
				if(this.mobile === "") return ;
				if(this.mobile.length < 7) {
					this.$Inter.JerryAlert("电话号码长度有误")
					this.mobile = "";
					return ;
				}
				this.$JerryRequest({
					url:"/checkPhoneByUser?mobile="+that.mobile
				}).then(res => {
					if(res.data.reqstatus == false){
						that.$Inter.JerryAlert("手机号没有注册过");
						that.mobile = "";
						that.isDisable = true;
						return ;
					}else {
						that.isDisable = false;
					}
				})
			},
			changeMobile(e) {
			},
			change(e) {},
			finish(e) {
				let that = this;
				// console.log('输入结束，当前值为：' + e);
				if (this.code == e) {
					this.$Inter.JerryAlert("验证成功");
					setTimeout(() => {
						uni.navigateTo({
							url: "./setPassword?mobile=" + that.mobile
						})
					}, 1000)
				} else {
					this.$Inter.JerryAlert("验证码错误")
				}
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(this.sin>0){
					return;
				}
				this.$refs.verifyElement.show();
				// this.isDisable = true;
				// let that = this;
				// setTimeout(() => {
				// 	that.isDisable = false;
				// }, 52000)
				// if (this.$refs.uCode.canGetCode) {
				// 	// 模拟向后端请求验证码
				// 	uni.showLoading({
				// 		title: '正在获取验证码'
				// 	})
				// 	setTimeout(() => {
				// 		uni.hideLoading();
				// 		// 这里此提示会被this.start()方法中的提示覆盖
				// 		uni.$u.toast('验证码已发送');
				// 		// 通知验证码组件内部开始倒计时
				// 		this.$refs.uCode.start();
				// 	}, 2000);
				// } else {
				// 	uni.$u.toast('倒计时结束后再发送');
				// }
			},
			end() {
				// uni.$u.toast('倒计时结束');
			},
			start() {
				let that = this;
				uni.$u.toast('倒计时开始');
				this.$JerryRequest({
					url: "/sendEmail"
				}).then(res => {
					that.code = JSON.stringify(res.data);
				})
			}
		}
	}
</script>

<style lang="scss">
	.input {
		margin-top: 10px;
		margin-bottom: 20px;
	}
	.wrap {
		padding: 24rpx;
	}

	.certify {
		display: flex;
		margin: 20px;
		justify-content: center;
	}

	.certigyInput {}
	.boxbox{
		width:726upx;
		border:2upx solid rgba(249,149,7,1);
		border-radius:22upx;
		padding: 16upx 0;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}
	.neiBox{
		width:689upx;
		margin: 0 auto;
		background:rgba(40,15,83,0.45);
		border-radius:24upx;
	}
	.inputBox{
		width: 515upx;
		height: 100upx;
		margin: 24upx auto 0;
		position: relative;
		display: flex;
		align-items: center;
		border-bottom: 1upx solid rgba(250,251,253,1);
	}
	.tubiao{
		height: 47upx;
		width: 47upx;
		margin-right: 45upx;
		flex-shrink: 0;
	}
	.inputPlaceholder{
		font-size:24upx;
		font-weight:400;
		color:rgba(252,249,249,0.26);
	}
	input{
		width: 100%;
		font-size:24upx;
		font-weight:400;
		color:rgba(252,249,249,0.26);
	}
	.zhuce{
		width:260upx;
		height:61upx;
		margin: 25upx 0;
		display: block;
	}
	.yiyou{
		width:100%;
		font-size:26upx;
		font-weight:400;
		text-decoration:underline;
		color:rgba(84,100,225,1);
		text-align: center;
		padding-bottom: 44upx;
	}
	.fasong{
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		padding: 0 25upx;
		font-size: 24upx;
		color: #fff;
		border-radius: 50upx;
		height: 44upx;
		line-height: 44upx;
		background-color: #2c1863;
	}
	.bottomBg{
		width: 750upx;
		height: 355upx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1;
	}
</style>
