<template>
	<view class="top">
		<u-navbar leftText="返回" @leftClick="leftClick" title="图书详情" :safeAreaInsetTop="true" :bgColor="bgColor" autoBack
			@rightClick="rightClick">
			<view class="u-nav-slot" slot="right">
				<u-icon name="man-add" size="21"></u-icon>
			</view>
		</u-navbar>
		<view>
			<u-modal :show="show" :title="title" @confirm="confirm" @cancel="cancel" :content='content'
				showCancelButton></u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		name: "navigationBar",
		data() {
			return {
				bgColor: '#ff510a',
				show:false,
				content:"",
				title: '可通过以下电话号码跟本人联系',
			}
		},
		methods: {
			rightClick() {
				this.show = true;
				this.content = "复制联系方式: " + this.mobile
			},
			leftClick(){
				uni.navigateTo({
					url:"../pages/sell/sell"
				})
			},
			confirm() {
				this.show = false;
				uni.setClipboardData({
					data: this.mobile,
					success: function() {}
				});
			},
			cancel() {
				this.show = false;
			},
		},
		props:{
			username:{
				type:String || Object,
				default:""
			},
			mobile:{
				type:String || Object,
				default:""
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-nav-slot {
		display: flex;
		color: #FFFFFF;

	}
</style>
