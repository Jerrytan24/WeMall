<template>
	<view class="chatRoom">
				<view class="u-demo-block__content" style="margin-top: 15px;">
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u-input placeholder="请输入内容" v-model="inputValue">
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input placeholder="请输入内容">
							<!-- #endif -->
							<template slot="suffix">
								<!-- <u-code ref="uCode" @change="codeChange" seconds="20" ></u-code> -->
								<u-button type="success" size="mini" @click="sendMessge">发送</u-button>
							</template>
							<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</view>
			</view>
</template>

<script>
	export default {
		name: "chat-input",
		data() {
			return {
				inputValue: ''
			}
		},
		methods: {
			sendMessge: function () {
				var that = this;
				if (that.inputValue.trim() == '') {

					that.inputValue = '';
				} else {

					//点击发送按钮时，通知父组件用户输入的内容
					this.$emit('send-message', {
						type: 'text',
						content: that.inputValue
					});
					that.inputValue = '';
				}
			}
		}
	}
</script>

<style>
	.chatRoom {
			position: fixed;
			bottom: 0;
			height: 120rpx;
			width: 100%;
		}
</style>
