<template name='sunui-mverify'>
	<view class="sunui-slider">
		<text style="color: #666;">{{ hint }}</text>
		<view class='sunui-slider-bg' :style="{left:-(w + 2)+'px',transform:cssAnimation}">
			<text>{{ succeedMsg }}</text>
			<view class='sunui-slider-box' @touchmove='moveStart' @touchend='moveEnd'>
				<text class="iconfont" :class="[isVerify?'icon-wancheng':'icon-youjiantou']"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hint: '右滑验证',
				sysW: uni.getSystemInfoSync().windowWidth,
				xAxial: 0,
				x: 0,
				w: (uni.getSystemInfoSync().windowWidth * 0.8) - 50,
				cssAnimation: 'translate3d(0, 0, 0)',
				succeedMsg: '',
				pullStatus: true,
				isVerify: false
			}
		},
		name: 'sunui-mverify',
		methods: {
			moveStart(e) {
				if (this.pullStatus) {
					this.x = e.changedTouches[0].clientX - ((this.sysW * 0.1) + 25);
					this.x >= this.w ? this.xAxial = this.w : this.xAxial = this.x;
					if (this.x < 25) this.xAxial = 0;
					this.cssAnimation = 'translate3d(' + this.xAxial + 'px, 0, 0)';
					this.cssAnimation = this.cssAnimation
					this.succeedMsg = '验证中...';
				}
			},
			moveEnd() {
				let tag;
				if (this.x >= this.w) {
					this.xAxial = this.w;
					this.succeedMsg = '验证成功';
					tag = true;
					this.pullStatus = false;
					this.isVerify = true;
				} else {
					this.xAxial = 0;
					this.succeedMsg = '';
					tag = false;
					this.isVerify = false;
				}
				this.$emit('change', {
					msg: tag
				});
				this.cssAnimation = 'translate3d(' + this.xAxial + 'px, 0, 0)';
				this.succeedMsg = this.succeedMsg;
				this.cssAnimation = this.cssAnimation;
			}
		}
	}
</script>

<style>
	@import url("iconfont");

	.sunui-slider {
		position: relative;
		overflow: hidden;
		width: 602upx;
		height: 80upx;
		line-height: 80upx;
		margin: 0 auto;
		border-radius: 5px;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, .1);
		font-size: 32upx;
		text-align: center;
	}

	.sunui-slider-bg {
		position: absolute;
		overflow: hidden;
		top: 0;
		width: 101%;
		height: 80upx;
		line-height: 80upx;
		background-color: #7BBB55;
		border-radius: 5px;
		color: #fff;
	}

	.sunui-slider-box {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		width: 58px;
		background-color: #EBEBEB;
	}
</style>
