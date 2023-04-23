<template>
	<view class="flex a-center container">
		<view class="flex icon">
			<view class="flex f-col a-center icon-item" v-for="(item,index) in options" :key="index"
				@click="handleClick(item, index)">
				<view>
					<uni-icons :type="item.icon" :color="item.iconColor"></uni-icons>
					<text class="info" v-if="item.info" :style="{background: item.infoColor}">{{item.info}}</text>
					<view class="dot" v-if="item.dot"></view>
				</view>
				<view class="text flex a-center j-center">
					{{item.text}}
				</view>
			</view>
		</view>
		<view class="f-1 flex a-center btn" v-if="Array.isArray(buttons)">
			<view class="btn-icon flex a-center j-center" :class="{'f-btn' :!buttons[0].background}"
				:style="{background: buttons[0].background}" @click="clickButton(buttons[0], 0)">
				{{buttons[0].text}}
			</view>
			<view class="btn-icon flex a-center j-center" :class="{'l-btn' :!buttons[1].background}"
				:style="{background: buttons[1].background}" @click="clickButton(buttons[1], 1)">
				{{buttons[1].text}}
			</view>
		</view>
		<view class="f-1 flex a-center btn" v-else>
			<view class="btn-icon flex a-center j-center" :class="{'f-btn' :!buttons.background}"
				:style="{background: buttons.background}" @click="clickButton(buttons, 0)">
				{{buttons.text}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		name: "ai-goods-action",
		components: {
			uniIcons
		},
		props: {
			options: {
				type: Array,
				required: true
			},
			buttons: {
				type: [Array, Object],
				required: true
			},
			bookId: {
				type: Number,
			}
		},
		data() {
			return {}
		},
		methods: {
			handleClick(item, index) {
				this.checkLogin();
				this.$emit('click', {
					item,
					index
				})
			},
			clickButton(item, index) {
				let that = this;
				if(this.$store.state.username !== ""){
					this.$emit('add_Cart',item.text);
				}else{
					return uni.showToast({
						title: '尚未登录'
					})
				}
				this.$emit('clickButton', {
					item,
					index
				})
			},
			checkLogin(item){
				let that = this;
				if (this.$store.state.username !== "") {
					uni.request({
						url: 'http://175.24.116.94:8082/api/insertCollect?bookId=' + that.bookId + '&usernameId='+that.usernameId,
						method:"POST",
						success(res) {
							if(res.data === true){
								return uni.showToast({
									title:'已收藏'
								})
							}if(res.data === '收藏成功'){
								return uni.showToast({
									title:'收藏成功'
								})
							}
						}
					})
					uni.showToast({
						title: '收藏成功'
					})
				}else{
					return uni.showToast({
						title: '尚未登录'
					})
				}
			}
		},
		mounted() {
			this.options.map(item => {
				if (!item.iconColor) this.$set(item, 'iconColor', '#323233')
				if (item.info && !item.infoColor) this.$set(item, 'infoColor', '#ee0a24')
			})
			if (Array.isArray(this.buttons)) {
				this.buttons.map((item, index) => {
					if (index === 0 && !item.background) this.$set(item, 'background', '#ff8917')
					if (index === 1 && !item.background) this.$set(item, 'background', '#ee0a24')
				})
			}
			if (!Array.isArray(this.buttons) && !this.buttons.background) {
				this.$set(this.buttons, 'background', '#ff8917')
			}
		},
		onLoad() {
			this.Jerry_user = this.$store.state.username;
		},
		filters: {

		},
		computed: {

		},
		watch: {

		},
		directives: {

		},
		computed: mapState([
			'username',
			'usernameId'
		])
	}
</script>

<style scoped lang="scss">
	.container {
		// position: fixed;
		// bottom: 0;
		// left: 0;
		// right: 0;
		height: 100rpx;
		width: 100%;
		padding: 6rpx;
	}

	.flex {
		display: flex;
	}

	.f-col {
		flex-direction: column;
	}

	.a-center {
		align-items: center;
	}

	.j-center {
		justify-content: center;
	}

	.f-1 {
		flex: 1;
	}

	.icon {
		min-width: 96rpx;

		.icon-item {
			margin: 10rpx 24rpx;
			font-size: 14px;
			position: relative;
			top: 10rpx;
			.dot {
				width: 8px;
				min-width: 0;
				height: 8px;
				background-color: #ee0a24;
				border-radius: 100%;
				position: absolute;
				top: -8rpx;
				right: -4rpx;
			}

			.text {
				color: #646566;
			}

			.info {
				position: absolute;
				top: -12rpx;
				right: -8rpx;
				box-sizing: border-box;
				min-width: 16px;
				padding: 0 3px;
				color: #fff;
				font-weight: 500;
				font-size: 12px;
				font-family: -apple-system-font, Helvetica Neue, Arial, sans-serif;
				line-height: 1.2;
				text-align: center;
				border: 1px solid #fff;
				border-radius: 16px;
			}
		}
	}

	.btn {
		color: #fff;
		height: 100rpx;
		width: 100%;
		font-size: 14px;

		.btn-icon {
			height: 80rpx;
			width: 100%;
			position: relative;
			top: 10rpx;

			&:first-child {
				border-top-left-radius: 999px;
				border-bottom-left-radius: 999px;
			}

			&:last-child {
				border-top-right-radius: 999px;
				border-bottom-right-radius: 999px;
				margin-right: 10rpx;
			}
		}
	}

	.f-btn {
		background: #ff8917 !important;
	}

	.l-btn {
		background: #ee0a24 !important;
	}
</style>
