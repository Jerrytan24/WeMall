<template>
	<view class="top">
		<view class="u-page">
			<view class="u-demo-block">
				<view class="u-demo-block__content">
					<view class="album" @click="chatTop(textBlock.username)">
						<view class="album__avatar">
							<image :src="textBlock.userImage" mode="" style="width: 32px;height: 32px;"></image>
						</view>
						<view class="album__content">
							<u--text :text="textBlock.username" type="primary" bold size="17"></u--text>
							<u--text margin="0 0 8px 0" :text="textBlock.text"></u--text>
							<image :src="textBlock.image" mode="widthFix" class="myImg"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="middle">
			<view>
				<view class="album mid" v-for="(item,index) in list">
					<view class="album__avatar">
						<image :src="item.fromImage" mode="" style="width: 32px;height: 32px;"></image>
					</view>
					<view class="album__content" @click="chat(index,item.fromId,item.from)">
						<u--text :text="item.from" type="primary" bold size="17"></u--text>
						<u--text size="14" margin="0 0 8px 0" :text="item.from+reply+item.to+':'+item.text"></u--text>
						<view style="display: flex;">
							<u--text class="date" size="13" type="info" margin="0 0 8px 0"
								:text="item.time?item.time:dataTime"></u--text>
							<u-text @click="deleteReply(index,item.id,item.from)" class="iconfont icon-shanchu" size="13"
								type="warning"></u-text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal @confirm="confirm" showCancelButton @cancel="cancel" :show="show" :title="titleModel" :content='contentModel'></u-modal>
		<view class="place">

		</view>
		<view class="bottom">
			<view class="inp flexCenter">
				<u--input v-model="content" class="input" :placeholder="prefix+username" border="surround" clearable>
				</u--input>
			</view>
			<view class="btn flexCenter">
				<u-button size="mini" type="primary" @click="sendContent">发送</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text_id: 0,
				textBlock: {},
				content: "",
				username: "", //当前的评论对象
				prefix: "评论",
				reply: "回复",
				list: [],
				currentDate: "",
				dataTime: "刚刚",
				trueList: [], ////要插入数据库的内容,
				show: false,
				titleModel: '删除',
				contentModel: '是否删除这条评论',
				currentIndex:0,//需要删除数据的下标
				currentId:0,//需要删除数据的id
			}
		},
		methods: {
			chatTop(user){
				this.username = user;
			},
			confirm(){
				let that = this;
				this.$JerryRequest({
					url:"/deleteReplyMsgById?id="+that.currentId,
					method:"DELETE",
					token:uni.getStorageSync("token")
				})
				this.list.splice(this.currentIndex,1);
				this.show = false;
			},
			cancel(){
				this.show = false;
			},
			deleteReply(index,id,from) {
				if (from !== uni.getStorageSync("username")) {
					return;
				} else {
					this.currentIndex = index;
					this.currentId = id;
					this.show = true;
				}
			},
			chat(index, fromId, from) {
				this.username = from;
			},
			sendContent() {
				if (!this.content) {
					this.$Inter.JerryAlert("请输入内容");
					return;
				}
				let ob = {};
				this.getdate();
				ob.text = this.content;
				ob.from = uni.getStorageSync("username");
				ob.to = this.username;
				ob.text_id = this.text_id;
				ob.from_id = uni.getStorageSync("id");
				ob.from_image = uni.getStorageSync("image");
				ob.to_id = this.textBlock.userId;
				ob.date = this.currentDate;
				this.list.push(ob);
				this.trueList.push(ob)
				this.content = "";
				this.$api.insertReplyMsg(this.trueList);
				this.trueList = [];
			},
			async dataGet(id) {
				const res = await this.$JerryRequest({
					url: "/getMessageById?text_id=" + id,
					token:uni.getStorageSync("token")
				})
				this.textBlock = res.data;
				this.username = this.textBlock.username;
			},
			async dataGetReply(text_id) {
				const res = await this.$JerryRequest({
					url: "/getReply?text_id=" + text_id,
					token:uni.getStorageSync("token")
				})
				this.list = res.data;
			},
			getdate() {
				const year = new Date().getFullYear()
				const mounth = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : (new Date()
					.getMonth() + 1)
				const date = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
				const week = new Date().getDay()
				if (week === 1) {
					this.nowWeek = '星期一'
				} else if (week === 2) {
					this.nowWeek = '星期二'
				} else if (week === 3) {
					this.nowWeek = '星期三'
				} else if (week === 4) {
					this.nowWeek = '星期四'
				} else if (week === 5) {
					this.nowWeek = '星期五'
				} else if (week === 6) {
					this.nowWeek = '星期六'
				} else if (week === 27) {
					this.nowWeek = '星期日'
				}
				this.currentDate = year + '.' + mounth + '.' + date;
			}
		},
		onLoad(options) {
			this.text_id = options.id;
			this.dataGet(this.text_id);
			this.dataGetReply(this.text_id);
		},
	}
</script>

<style lang="scss" scoped>
	.middle {
		margin-top: 10px;

		.mid {}
	}

	.top {
		width: 100%;
		height: 100%;
		background-color: #EEEEEE;
	}

	page {
		background-color: #EEEEEE;
	}

	.place {
		width: 100%;
		height: 120rpx;
	}

	.bottom {
		display: flex;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 5;
		background-color: #FFFFFF;

		.inp {
			flex: 5;
			height: 80rpx;

			.input {
				width: 90%;
			}
		}

		.btn {
			flex: 1;
			width: 100%;
			height: 80rpx;
		}
	}

	.myImg {
		width: 300rpx;
		height: 250rpx;
	}

	.u-page {
		background-color: #FFFFFF;
	}

	.album {
		border-radius: 3px;
		margin-bottom: 5px;
		background-color: #FFFFFF;
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 5px;
			border-radius: 3px;
		}

		&__content {
			margin-left: 10px;
			flex: 1;
		}
	}
</style>
