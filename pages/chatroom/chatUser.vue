<template>
	<view>
		<view class="guangbo">
			<u-notice-bar :text="text1" bgColor="#fd842d" color="#FFFFFF"></u-notice-bar>
		</view>
		<view class="content">


		</view>
		<view class="chatRoom">
			<view class="u-demo-block__content" style="margin-top: 15px;">
				<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
				<!-- #ifndef APP-NVUE -->
				<u-input placeholder="请输入内容" v-model="text">
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<u--input placeholder="请输入内容">
						<!-- #endif -->
						<template slot="suffix">
							<!-- <u-code ref="uCode" @change="codeChange" seconds="20" ></u-code> -->
							<u-button type="success" size="mini" @click="send()">发送</u-button>
						</template>
						<!-- #ifndef APP-NVUE -->
				</u-input>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				</u--input>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	// import request from "@/utils/request";

	var SocketTask;
	export default {

		name: "Im",
		data() {
			return {
				userText: "",
				text1: "",
				user: {},
				isCollapse: false,
				users: [],
				chatUser: '',
				text: "",
				messages: [],
				content: ''
			}
		},
		onLoad(options) {
			this.userText = options.username;
			this.init()
		},
		methods: {
			send() {
				if (!this.text) {
					return uni.showToast({
						title: "请输入内容"
					})
				} else {
					if (typeof(WebSocket) == "undefined") {
						console.log("您的浏览器不支持WebSocket");
					} else {
						console.log("您的浏览器支持WebSocket");
						// 组装待发送的消息 json
						// {"from": "zhang", "to": "admin", "text": "聊天文本"}
						let message = {
							from: this.user.username,
							to: this.userText,
							text: this.text
						}
						uni.sendSocketMessage(JSON.stringify(message)); // 将组装好的json发送给服务端，由服务端进行转发
						this.messages.push({
							user: this.user.username,
							text: this.text
						})
						// 构建消息内容，本人消息
						this.createContent(null, this.user.username, this.text)
						this.text = '';
					}
				}
			},
			createContent(remoteUser, nowUser, text) { // 这个方法是用来将 json的聊天消息数据转换成 html的。
				let html
				// 当前用户消息
				if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
					html = "<view class=\"el-row\" style=\"padding: 5px 0\">\n" +
						"  <view class=\"el-col el-col-22\" style=\"text-align: right; padding-right: 10px\">\n" +
						"    <view class=\"tip left\">" + text + "</view>\n" +
						"  </view>\n" +
						"  <view class=\"el-col el-col-2\">\n" +
						"  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
						"    <img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
						"  </span>\n" +
						"  </view>\n" +
						"</view>";
				} else if (remoteUser) { // remoteUser表示远程用户聊天消息，蓝色的气泡
					html = "<view class=\"el-row\" style=\"padding: 5px 0\">\n" +
						"  <view class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
						"  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
						"    <img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
						"  </span>\n" +
						"  </view>\n" +
						"  <view class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 10px\">\n" +
						"    <view class=\"tip right\">" + text + "</view>\n" +
						"  </view>\n" +
						"</view>";
				}
				console.log(html)
				this.content += html;
			},
			init() {
				// this.user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {}

				// let username = this.user.username;
				let username = uni.getStorageSync("username");
				let _this = this;
				_this.text1 = "用户" + username + "已进入聊天"
				if (typeof(WebSocket) == "undefined") {
					console.log("您的浏览器不支持WebSocket");
				} else {
					console.log("您的浏览器支持WebSocket");
					let socketUrl = "ws://localhost:8080/imserver/" + username;
					if (SocketTask != null) {
						SocketTask.close();
						SocketTask = null;
					}
					// 开启一个websocket服务
					console.log(socketUrl)
					uni.connectSocket({
						url: "ws://localhost:8080/imserver/" + username, //仅为示例，并非真实接口地址。
						complete: () => {

						},
						success(res) {
							console.log(res)
						},
						fail(err) {
							console.log(err)
						}

					});
					// console.log(SocketTask)
					// SocketTask.onOpen(function(res){
					// 	console.log("websockrt已打开")
					// });
					uni.onSocketOpen(function(res) {
						console.log("websockrt已打开")
					})
					//  浏览器端收消息，获得从服务端发送过来的文本消息
					uni.onSocketMessage(function(msg) {
						console.log("收到数据====" + msg.data)
						let data = JSON.parse(msg
							.data
						) // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
						if (data.users) { // 获取在线人员信息
							_this.users = data.users.filter(user => user.username !==
								username) // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
						} else {
							// 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
							//  // {"from": "zhang", "text": "hello"}
							if (data.from === _this.chatUser) {
								_this.messages.push(data)
								// 构建消息内容
								_this.createContent(data.from, null, data.text)
							}
						}
					});
					//关闭事件
					uni.onSocketClose(function() {
						console.log("websocket已关闭");
					});
					//发生了错误事件
					uni.onSocketError(function() {
						console.log("websocket发生了错误");
					});
				}
			}

		}
	}
</script>
<style lang="scss">
	.chatRoom {
		position: fixed;
		bottom: 0;
		height: 120rpx;
		width: 100%;
	}
</style>
