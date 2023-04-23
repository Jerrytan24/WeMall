<script>
	import chatInput from '../../components/chatinput.vue';
	import messageShow from '../../components/messageshow.vue';
	import {
		mapState
	} from "vuex"
	export default {
		computed: {
			...mapState({
				"fromUserText": "fromUserText"
			})
		},
		data() {
			return {
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0,
				},
				// socketOpen: false,
				scrollTop: 99999,
				messages: [],
				username: "", //需要对话的对象
				fromSrc: "",
				toSrc: "",
				scrollTopHeight: "99999",
			}
		},
		components: {
			chatInput,
			messageShow
		},
		onLoad(options) {
			this.username = options.username;
			this.toSrc = options.userImage;
			if (this.$store.state.fromUserText.length > 0) {
				this.$store.state.fromUserText.map(item => {
					if (item.tousername === uni.getStorageSync("username")) {
						let ob = {};
						ob.user = "home";
						ob.content = item.textMessage
						ob.hasSub = false;
						this.messages.push(ob)
					}
					if(item.fromusername === uni.getStorageSync("username")){
						let ob = {};
						ob.user = "customer";
						ob.content = item.textMessage;
						ob.hasSub = false;
						this.messages.push(ob);
					}
				})
			}
		},
		onShow() {

		},
		created: function() {
			const res = uni.getSystemInfoSync();
			this.websockets();
			this.fromSrc = uni.getStorageSync("image");
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
		},
		methods: {
			websockets() {
				let that = this;
				//连接
				// uni.connectSocket({
				// 	url: 'ws://127.0.0.1:8080/websocket/' + uni.getStorageSync("username")
				// })
				//打开websocket回调
				// uni.onSocketOpen(function(res) {
				// 	that.socketOpen = true;
				// 	console.log(that.socketOpen)
				// 	console.log('WebSocket连接已打开！');
				// });
				//连接失败回调
				uni.onSocketError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
					uni.showToast({
						title: 'WebSocket连接打开失败，请检查！',
						icon: 'none'
					})
				});
				//服务端过来内容之后打印
				uni.onSocketMessage(function(res) {
					// console.log('收到服务器内容：' + res.data);
					that.replyText = JSON.parse(res.data).textMessage;
					let fromusername = JSON.parse(res.data).fromusername
					if (that.replyText !== undefined && that.replyText !== "") {
						that.$store.state.fromUser.map(item => {
							if(item !== fromusername){
								that.$store.dispatch("setfromUser", fromusername);
							}
						})
						that.$store.dispatch("setShowToast", true);
						that.$store.dispatch("setfromUserText", JSON.parse(res.data))
						that.addMessage('home', that.replyText, false);
					}
				});
				//关闭websocket打印
				uni.onSocketClose(function(res) {
					console.log('WebSocket 已关闭！');
					uni.showToast({
						title: 'WebSocket 已关闭！',
						icon: 'none'
					})
				});
			},
			getInputMessage: function(message) { //获取子组件的输入数据
				// console.log(message);
				this.addMessage('customer', message.content, false);
				this.send(message.content)
			},
			addMessage: function(user, content, hasSub, subcontent) {
				var that = this;
				that.messages.push({
					user: user,
					content: content,
					hasSub: hasSub,
					subcontent: subcontent
				});
			},
			scrollToBottom: function() {
				var that = this;
				var query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();

				query.exec(function(res) {
					that.style.mitemHeight = 0;
					res[0].forEach(function(rect) {
						// console.info(rect.height);
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
					});
					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight;
					}
				});
			},
			send(message) {
				let msg = {}
				msg.username = uni.getStorageSync("username")
				msg.message = message;
				msg.to = this.username;
				// console.log(this.socketOpen)
				let that = this;
				if (that.socketOpen) {
					// console.log("计算属性", this.$store.state.fromUserText)
					// console.log(message)
					uni.sendSocketMessage({
						data: JSON.stringify(msg)
					});
				} else {}
			}
		},
		computed: {
			...mapState({
				"socketOpen": "socketOpen"
			}, {
				"fromUserText": "fromUserText"
			})
		}
	}
</script>
<template>
	<view class="uni-column">
		<view class="content" id="content" :style="{height:style.contentViewHeight+'px'}">
			<scroll-view id="scrollview" scroll-y="true"  :style="{height:style.contentViewHeight+'px'}"
				:scroll-with-animation="true" :scroll-top="scrollTop">
				<message-show :fromSrc="fromSrc" :toSrc="toSrc" v-for="(message,index) in messages" :key="index"
					:message="message" :id="index">
				</message-show>
				<view id="bottom"></view>
			</scroll-view>
		</view>
		<view class="foot">
			<chat-input @send-message="getInputMessage"></chat-input>
		</view>
	</view>
</template>

<style>
	.uni-column {
		display: flex;
		flex-direction: column;
	}
	.content {
		display: flex;
		flex: 1;
		margin-bottom: 100px;
	}
	.foot {
		position: fixed;
		width: 100%;
		height: 60px;
		min-height: 60px;
		left: 0px;
		bottom: 0px;
		overflow: hidden;
	}
</style>
