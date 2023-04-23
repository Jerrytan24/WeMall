<template>
	<view>
		<navigation :username="username" :mobile="mobile"></navigation>
		<view class="top">

		</view>
		<view class="bottom">
			<image :src="book.image"></image>
			<view class="info">
				<view>
					<text class="name">
						<text>书名：</text><text>{{book.title}}</text>
					</text>
				</view>
				<view class="author">
					<text>
						<text>作者：</text><text>{{book.author}}</text>
					</text>
				</view>
				<view class="bookInfo">
					<view class="isbn">
						<text>
							<text>ISBN：</text><text>{{9782546012312}}</text>
						</text>
					</view>
					<view class="price">
						<text>
							<text>价格：</text><text>￥{{book.price}}</text>
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="comments">
		</view>
		<view class="fixBottom">
			<view class="left">
				<view class="left_first" @click="navigate">
					<view>
						<image src="../../static/shop.png"></image>
					</view>
					<view>店铺</view>
				</view>
				<view class="left_second" @click="collectSelect(book_id,book.title)">
					<view>
						<image :src="image_url"></image>
					</view>
					<view>收藏</view>
				</view>
				<view class="left_third" @click="chatUser">
					<image src="../../static/chat.png"></image>
					<text>私聊</text>
				</view>
			</view>
			<view class="right">
				<view class="right_first" @click="addCart(book.title)">
					<view>加入购物车</view>
				</view>
				<view class="right_second" @click="placeOrder">
					<view>立即购买</view>
				</view>
			</view>
		</view>
		<popup-component :show="show" :sellerId="sellerId" :bookImage="currentImage" :bookPrice="book.price"
			:bookNum="book.number"></popup-component>
	</view>
</template>
<script>
	import api from "@/util/interface.js";
	import navigation from "@/components/navigationBar.vue"
	import popupComponent from "@/components/popupComponent.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				book_id: 0,
				book: [],
				username: '', //发布书籍的人
				userImage: "", //发布书籍的人的图片
				userId: 0, //当前登录的用户id
				user: [],
				sellerId: 0, //卖家ID
				mobile: "",
				image_url: "../../static/collect.png",
				imageBool: false,
				flag: "", ///验证用户是否已经收藏
				show: false, //底部弹出框，默认是false
				currentImage: "", //当前图书的图片地址,
				cartListTemp: {},
			}
		},
		onLoad: function(option) {
			let now = new Date();
			let month = now.getMonth() + 1; //月
			let day = now.getDate();
			let temp = "";
			temp = month+"月"+day+"日";
			this.dataGet(option.bookId);
			this.book_id = option.bookId;
			this.userGet(option.userId);
			this.sellerId = parseInt(option.userId);
			this.userId = uni.getStorageSync("id");
			let that = this;
			this.$JerryRequest({
				url:"/selectPageView?seller_id="+that.sellerId+"&day="+temp,
				method:"GET",
				token:uni.getStorageSync("token"),
			}).then(res => {
				if(res.data.reqstatus === true){
					that.$api.updatePageView(that.sellerId,temp);
				}else {
					that.$api.insertPageView(that.sellerId,1,temp);
				}
			}).catch(err => {
				
			})
		},
		methods: {
			navigate() {
				if (!uni.getStorageSync("id")) {
					this.$Inter.JerryAlert("您还未登录");
					return;
				}
				let that = this;
				uni.navigateTo({
					url: "../warehouse/index?sellerId=" + that.sellerId + "&username=" + that.username
				})
			},
			placeOrder() {
				const res = this.$Inter.judgement(uni.getStorageSync("username"));
				if (res === 0) {
					return;
				}
				if (this.sellerId == this.userId) {
					this.$Inter.JerryAlert("该本书是您发布的");
					return;
				}
				this.$store.state.popShow = true;
				this.$store.dispatch("setbookOrderRec",this.book.title);

			},
			addCart(title) {
				let ob = {};
				const res = this.$Inter.judgement(uni.getStorageSync("username"));
				if (res === 0) {
					return;
				}
				if (this.sellerId == this.userId) {
					this.$Inter.JerryAlert("该本书是您发布的");
					return;
				}
				this.$api.insertUserCart(this.userId, this.book_id, this.sellerId);
				ob.image = this.book.image;
				ob.title = this.book.title;
				ob.price = this.book.price;
				ob.number = this.book.number;
				ob.id = this.book.id;
				ob.author = this.book.author;
				ob.num = this.book.num;
				ob.flag = this.book.flag;
				this.$store.dispatch("setcartlist", ob);
				this.$Inter.JerryAlert("已加入购物车");
				this.$store.dispatch("setbookCartRec",this.book.image)
			},
			async getIsCollect(book_id, user_id) {
				const res = await this.$JerryRequest({
					url: "/selectcollect?book_id=" + book_id + "&user_id=" + user_id,
					token: uni.getStorageSync("token")
				})
				this.flag = res.statusCode;
				if (this.flag == 200) {
					this.image_url = "../../static/collectSelcted.png";
					this.imageBool = true;
				} else {
					this.image_url = "../../static/collect.png";
					this.imageBool = false;
				}
			},
			async dataGetUserImage(username){
				const res = await this.$JerryRequest({
					url:"/getImageByUsername?username="+username
				});
				uni.navigateTo({
					url:"../chat/index?username="+username+"&userImage="+res.data
				})
			},
			chatUser() {
				const res = this.$Inter.judgement(uni.getStorageSync("username"));
				if (res === 0) {
					return;
				}
				if (this.sellerId == this.userId) {
					this.$Inter.JerryAlert("该本书是您发布的");
					return;
				}
				let that = this;
				this.dataGetUserImage(this.user.username)
			},
			async dataGet(id) {
				let that = this;
				const res = await this.$JerryRequest({
					url: "/getBookById?id=" + id,
				})
				that.book = res.data;
				this.currentImage = res.data.image;
			},
			insertBook(way) {
				let that = this;
				if (way == 1) {
					that.$JerrySecond({
						url: "/insertcollect",
						data: {
							user_id: that.userId,
							book_id: that.book_id,
							seller_id: that.sellerId,
						},
						token: uni.getStorageSync("token"),
					});
					this.$api.insertBookCollect(this.book_id, 1);
					this.$store.dispatch("setbookNameRec",this.book.title);
				}
				if (way == 2) {
					this.deleteCollect(uni.getStorageSync("id"), uni.getStorageSync("bookId"));
					this.$api.insertBookCollect(this.book_id, -1);
				}
			},
			async userGet(id) {
				const res = await this.$JerryRequest({
					url: "/userGetById?userId=" + id,
					token: uni.getStorageSync("token"),
				})
				this.user = res.data;
				this.username = res.data.username;
				this.content = "复制联系方式: " + this.user.mobile
				this.mobile = this.user.mobile;
				this.$store.state.userImage = res.data.image;
			},
			infoSearch() {

			},
			async deleteCollect(user_id, book_id) {
				this.$JerryRequest({
					url: "/deleteUserCollect?user_id=" + user_id + "&book_id=" + book_id,
					method: "DELETE",
					token: uni.getStorageSync("token")
				})
			},
			collectSelect(book_id, title) {
				const res = this.$Inter.judgement(uni.getStorageSync("username"));
				if (res === 0) {
					return;
				}
				if (this.sellerId == this.userId) {
					this.$Inter.JerryAlert("该本书是您发布的");
					return;
				}
				this.imageBool = !this.imageBool;
				if (this.imageBool === true) {
					this.insertBook(1);
					this.image_url = "../../static/collectSelcted.png";
					return uni.showToast({
						title: "收藏成功"
					})
				} else {
					this.insertBook(2)
					this.image_url = "../../static/collect.png"
					return uni.showToast({
						title: "取消收藏"
					})
				}
			}
		},
		onShow() {
			this.userId = uni.getStorageSync("id");
			this.book_id = uni.getStorageSync("bookId");
			this.getIsCollect(uni.getStorageSync("bookId"), uni.getStorageSync("id"));
		},
		components: {
			navigation,
			popupComponent,
		},
		computed: {
			...mapState({
				"bookNameRec": "bookNameRec"
			}, {
				"bookCartRec": "bookCartRec"
			}, {
				"bookOrderRec": "bookOrderRec"
			})
		}
	}
</script>
<style lang="scss">
	.profileInfo {
		flex: 4;
		justify-content: center;
		align-items: center;
	}

	.bottom {
		margin-top: 25%;

		image {
			width: 70%;
			height: 500rpx;
			margin-left: 15%;
			margin-top: 5%;
		}

		.author {
			margin-top: 14rpx;

			text:nth-child(1) {
				font-size: 13px;
				color: #ffffff;
				background-color: #ff0000;
			}

			text:nth-child(2) {
				font-size: 15px;
				font-weight: 700;
				background-color: #FFFFFF;
				color: #000000;
				margin-left: 10rpx;
			}
		}

		.info {
			margin: 0 3%;
			margin-top: 10px;
			.name {
				font-size: 13px;
				text:nth-child(1) {
					color: #ffffff;
					
					background-color: #ff0000;
				}

				text:nth-child(2) {
					font-size: 14px;
					font-weight: 700;
					background-color: #FFFFFF;
					color: #000000;
					line-height: 20px;
				}
			}

			.bookInfo {
				margin-top: 10rpx;
				display: flex;

				.isbn {
					text:nth-child(1) {
						font-size: 13px;
					}

					text:nth-child(2) {
						font-size: 15px;
						font-weight: 700;
					}

					flex:1;
				}

				.price {
					text:nth-child(1) {
						font-size: 13px;
					}

					text:nth-child(2) {
						font-size: 15px;
						font-weight: 700;
						color: #ff0000;
					}

					flex:1;
				}
			}
		}
	}

	.fixBottom {
		display: flex;
		height: 120rpx;
		position: fixed;
		background-color: #ece9eb;
		bottom: 0;
		left: 0;
		width: 100%;

		.left {
			image {
				width: 40rpx;
				height: 40rpx;
			}

			font-size: 12px;
			flex: 2;
			display: flex;
			justify-content: center;
			align-items: center;

			.left_first {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			.left_second {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			.left_third {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				text {
					margin-top: 2px;
				}
			}
		}

		.right {
			flex: 2;
			display: flex;
			justify-content: center;
			align-items: center;

			.right_first {
				flex: 1;
				flex-direction: column;
				display: flex;
				justify-content: center;
				align-items: center;

				view {
					background-image: linear-gradient(to right, #ebee09, #ee745b);
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
					width: 100%;
					height: 80rpx;
					color: #FFFFFF;
					border-radius: 40rpx 0 0 40rpx;
				}
			}

			.right_second {
				flex: 1;
				flex-direction: column;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 80rpx;
				color: #FFFFFF;
				background-image: linear-gradient(to right, #ee745b, #ee3507);
				border-radius: 0 40rpx 40rpx 0;
			}
		}
	}
</style>
