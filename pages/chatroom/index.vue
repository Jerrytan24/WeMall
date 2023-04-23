<template>
	<view class="top">
		<view class="guangbo" v-for="item in users" :key="item.username">
			<view class="people" @click="selectUser(item.username)">
				<view class="view1">
					<image style="width: 80rpx;height: 80rpx;" src="../../static/friend.png"></image>
				</view>
				<view class="view2"><text>用户名：{{item.username}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	// import request from "@/utils/request";
	var SocketTask;
	export default {
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
		onLoad() {
			this.init();
		},
		methods: {
			selectUser(username) {
				uni.navigateTo({
					url: "chatUser?username=" + username
				})
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
<style lang="scss" scoped>
	.top {
		height: 100%;
		width: 100%;
		background-color: #EEEEEE;
	}

	.chatRoom {
		position: fixed;
		bottom: 0;
		height: 120rpx;
		width: 100%;
	}

	.guangbo {
		height: 140rpx;
		width: 100%;
	}

	.people {
		height: 120rpx;
		width: 100%;
		background-color: #FFFFFF;
		display: flex;

		.view1 {
			flex: 2;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

		}

		.view2 {
			flex: 4;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
</style>
