<template>
	<view>
		<!-- 状态栏 -->
		<view class="status" :style="{position:headerPosition}"></view>
		<!-- 漂浮头部 -->
		<view class="header" :style="{position:headerPosition}">
			<view class="scan">
				<view class="icon scan" @tap="scan"></view>
			</view>
			<view class="input">
				<view class="icon search"></view>
				<input disabled placeholder="点击搜索" @tap="toSearch()" />
			</view>
			<view class="menu">
				<image @click="profileClick" mode="widthFix" :src="userImage"></image>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 轮播图 -->
		<view class="swiper-view">
			<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true"
				indicator-active-color="#ffffff">
				<swiper-item v-for="swiper in swiperList" :key="swiper.sid">
					<image mode="aspectFill" :src="swiper.img"></image>
				</swiper-item>
			</swiper>
			<view class="keep-out"></view>
		</view>
		<!-- 分类轮播 -->
		<view class="category">
			<view class="box">
				<swiper class="swiper" duration="300" :style="{ height: categoryHeight }" @change="categoryChange">
					<swiper-item v-for="(page, pageindex) in categoryList" :key="pageindex">
						<view class="category-list">
							<view class="icon" v-for="category in page" :key="category.cat_id"
								@tap="toCategory(category)">
								<image mode="widthFix" :src="category.img" @load="categoryImgLoad"></image>
								<view>{{ category.title }}</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="dots">
					<view v-for="(page, pageindex) in categoryList" :key="pageindex"
						:class="{ active: pageindex == currentPageindex }"></view>
				</view>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="pick">
			<view class="box">
				<view class="title">
					<view class="big">推荐商品</view>
					<view class="small">好货推荐 低价精选</view>
				</view>
				<view class="product-list">
					<view v-for="product in pickList" :key="product.goods_id" @tap="toPick(product.goods_id)">
						<image mode="widthFix" :src="product.img"></image>
						<view class="price">{{product.price}}</view>
						<view class="slogan">{{product.slogan}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 广告横幅 -->
		<view class="banner">
			<image mode="widthFix" src="./banner.jpg"></image>
		</view>
		<view>
			<u-notice-bar :text="text1" v-show="showToastMine"></u-notice-bar>
		</view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="title">— 猜你喜欢 —</view>
			<view class="product-list">
				<view class="product" v-for="product in productList" :key="product.id"
					@tap="toGoods(product.id,product.userId)">
					<image :src="product.image"></image>
					<view class="name">{{product.title}}</view>
					<view class="info">
						<view class="price">￥{{product.price}}</view>
						<view class="collect">收藏人数：{{product.collect}}</view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				//轮播
				swiperList: [{
						sid: 0,
						src: '',
						img: '../../static/lunbo/01.jpg'
					},
					{
						sid: 1,
						src: '',
						img: '../../static/lunbo/02.jpg'
					},
					{
						sid: 2,
						src: '',
						img: '../../static/lunbo/03.jpg'
					},
					{
						sid: 3,
						src: '',
						img: '../../static/lunbo/04.jpg'
					}
				],
				//分类
				categoryList: [
					[ //第一页
						{
							cat_id: 0,
							img: '../../static/cate/fabu.png',
							title: '我的发布',
							url: "../myfabu/myfabu"
						},
						{
							cat_id: 1,
							img: '../../static/cate/xuqiuNew.png',
							title: '需求中心',
							url: "../center/center"
						},
						{
							cat_id: 2,
							img: '../../static/cate/renzhitiao.png',
							title: '扔纸条',
							url: "../mypaper/mypaper"
						},
						{
							cat_id: 3,
							img: '../../static/cate/guanyuwomen.png',
							title: '聊天信息',
							url: "../aboutwe/aboutwe"
						},
						{
							cat_id: 4,
							img: '../../static/cate/zhinan.png',
							title: '指南',
							url: "../zhinan/zhinan"
						},
						{
							cat_id: 5,
							img: '../../static/cate/shoucang.png',
							title: '我的收藏',
							url: "../collect/collect"
						},
						{
							cat_id: 6,
							img: '../../static/cate/Category.png',
							title: '分类',
							url: "../category/index"
						},
						{
							cat_id: 7,
							img: '../../static/cate/shengcun.png',
							title: '生存图鉴',
							url: "../shengcun/shengcun"
						},
						{
							cat_id: 8,
							img: '../../static/cate/zhiying.png',
							title: '直营',
							url: "../directSales/index"
						},
						{
							cat_id: 9,
							img: '../../static/cate/cloud%20upload-fill.png',
							title: '上传',
							url: "../upload/uppload"
						}
					],
					[ //第二页
						{
							cat_id: 10,
							img: '../../static/cate/meishi.png',
							title: '广州吃吃',
							url: "../chi/chi"
						},
						{
							cat_id: 11,
							img: '../../static/cate/jingxuan.png',
							title: '精选图书'
						},
					]
				],
				//推荐商品 3个
				pickList: [{
						goods_id: 0,
						img: 'http://img3m5.ddimg.cn/50/21/29354045-1_l_7.jpg',
						price: '￥168',
						slogan: '益智教育'
					},
					// { goods_id: 1, img: './static/HM-shophome/pick-img/p2.jpg', price: '￥168', slogan:'精选商品' },
					// { goods_id: 2, img: './static/HM-shophome/pick-img/p3.jpg', price: '￥168', slogan:'今日疯抢' }
				],
				//猜你喜欢列表
				productList: [],
				categoryHeight: '150px',
				currentPageindex: 0,
				headerPosition: "fixed",
				loadingText: "正在加载...",
				userImage: "",
				replyText: "",
				text1: '有人发消息给您啦！快去看看吧',

			};
		},
		onReady() {},
		onLoad() {
			this.websockets();
			if (this.bookCartRec || this.bookNameRec || this.bookOrderRec) {
				console.log(this.bookCartRec, "[[[]]]")
				this.dataGet(this.bookNameRec, this.bookCartRec, this.bookOrderRec)
			} else {
				this.dataGetBook();
			}
		},
		onShow() {
			this.userImage = uni.getStorageSync("image");
			if (this.bookCartRec || this.bookNameRec || this.bookOrderRec) {
				this.dataGet(this.bookNameRec, this.bookCartRec, this.bookOrderRec)
			}
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			let that = this;
			setTimeout(function() {
				uni.stopPullDownRefresh();
				that.dataGet(this.bookName, this.bookCart);
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			// let len = this.productList.length;
			// if(len>=40){
			// 	this.loadingText="到底了";
			// 	return false;
			// }
			// this.dataGet(this.bookName,this.bookCart);
		},
		// onLoad() {
		// 	this.userImage = uni.getStorageSync("image");
		// 	this.dataGet(uni.getStorageSync("bookName"),uni.getStorageSync("bookCart"));
		// },
		methods: {
			websockets() {
				let that = this;
				//连接
				uni.connectSocket({
					url: 'ws://127.0.0.1:8080/websocket/' + uni.getStorageSync("username")
				})
				//打开websocket回调
				uni.onSocketOpen(function(res) {
					that.$store.dispatch("setsocketOpen", true);
					console.log(that.socketOpen)
					console.log('WebSocket连接已打开！');
				});
				//连接失败回调
				uni.onSocketError(function(res) {
					that.$store.dispatch("setsocketOpen", false);
					console.log('WebSocket连接打开失败，请检查！');
					uni.showToast({
						title: 'WebSocket连接打开失败，请检查！',
						icon: 'none'
					})
				});
				//服务端过来内容之后打印
				uni.onSocketMessage(function(res) {
					console.log('收到服务器内容：' + res.data);
					that.replyText = JSON.parse(res.data).textMessage;
					let fromusername = JSON.parse(res.data).fromusername
					console.log("私信回复的值", "replyText:", that.replyText, "fromusername:", fromusername)
					if (that.replyText !== undefined && that.replyText !== "") {
						that.$store.dispatch("setShowToast",true);
						that.$store.dispatch("setfromUser", fromusername);
						that.$store.state.fromUser.map(item => {
							if(item !== fromusername){
								that.$store.dispatch("setfromUser", fromusername);
							}
						})
						that.$store.dispatch("setfromUserText",JSON.parse(res.data));
						console.log("收到信息：",that.$store.state.fromUserText)
					}
					
				});
				//关闭websocket打印
				uni.onSocketClose(function(res) {
					console.log('WebSocket 已关闭！');
					that.$store.dispatch("setsocketOpen", false);
					uni.showToast({
						title: 'WebSocket 已关闭！',
						icon: 'none'
					})
				});
			},
			profileClick() {
				uni.switchTab({
					url: "../profile/profile"
				})
			},
			async dataGet(bookName, bookCart, bookOrder) {
				const res = await this.$JerryRequest({
					url: "/getRecomend?bookName=" + bookName + "&bookCart=" + bookCart + "&bookOrder=" +
						bookOrder,
				})
				this.productList = [...res.data];
			},
			async dataGetBook() {
				const res = await this.$JerryRequest({
					url: "/getBook"
				})
				this.productList = [...this.productList, ...res.data];
			},
			//扫一扫
			scan() {
				uni.scanCode({
					success: (res) => {
						uni.showToast({
							title: '条码内容：' + res.result
						});
					}
				});
			},
			//搜索跳转
			toSearch() {
				uni.navigateTo({
					url: "../sell/search"
				})
			},
			//轮播图跳转
			toSwiper(e) {
				uni.showToast({
					title: e.src
				});
			},
			//分类跳转
			toCategory(e) {
				if (!uni.getStorageSync("id")) {
					uni.showModal({
						title: "您还未登录"
					})
				}
				if (e.title == "上传") {
					uni.switchTab({
						url: e.url,
					})
				} else {
					uni.navigateTo({
						url: e.url,
					})
				}
			},
			//推荐商品跳转
			toPick(e) {
				// uni.showToast({
				// 	title: '推荐商品' + e.goods_id
				// });
			},
			//商品跳转
			toGoods(id, userId) {
				uni.setStorageSync("bookId", id);
				uni.navigateTo({
					url: "../detail/detail?bookId=" + id + "&userId=" + userId
				})
			},
			//更新分类指示器
			categoryChange(event) {
				this.currentPageindex = event.detail.current;
			},
			//分类图片加载完毕
			categoryImgLoad(e) {
				this.categoryImg = this.categoryImg ? this.categoryImg + 1 : 1;
				//完成加载11个分类图片开始计算分类高度，若分类图片不足10个则修改此处的10。
				if (this.categoryImg == 10) {
					this.getCategoryHeight();
				}
			},
			//更新分类高度
			getCategoryHeight() {
				let view = uni.createSelectorQuery().select('.category-list');
				view.fields({
						size: true
					},
					data => {
						this.categoryHeight = data.height + 'px';
					}
				).exec();
			}
		},
		computed: {
			...mapState({
				"showToastMine":"showToastMine"
			}
			,{
				"bookNameRec": "bookNameRec"
			}, {
				"bookCartRec": "bookCartRec"
			}, {
				"bookOrderRec": "bookOrderRec"
			}, {
				"socketOpen": "socketOpen"
			}, {
				"fromUser": "fromUser"
			}, {
				"fromUserImage": "fromUserImage"
			}, {
				"fromUserText": "fromUserText"
			})
		}
	};
</script>
<style lang="scss">
	@font-face {
		font-family: "HMfont-home";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAP8AAsAAAAACFwAAAOwAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqEEINSATYCJAMQCwoABCAFhG0HTxtLBxHVmzvJfhS4scOeC1v4zNNRK/hO5b0IHqg/8838ye5XsIDanmAkhZ1NSZygm4SsbYYkp17ICsOUxIP/ZZm9xejtQAD8zzX10geY387mEtXapUd7A5xF6oAi2pJoE8YNY1dexGkIwCSZQoiq1es2RUdhTBKA6N2jWwf0lAlVky3QEYSUrFSIOTjQ5VR5GZjt/168obDQQeLQMGY27FqtMxWf5z5fpgWCgdYugng8B8DWgQYUAhSI7qWujmhhqBAaptJfURzQ0ZEwVkfB58uCQSTZi0o3//JAItBAhGBk2gAURUrtxMQ2BQnPC1IQ8HyZmpvE1XgdMIDtwHVEJt4qkThsZwFPVHiEFTHKtWBBYGGUe/HmsZu6TluCStw+fXGMY9GyUb4b133Xrze9etV77VqzxcuXbYq8bF6/7rtxo5lY6A1cLcuCQJS3oXHswOYKUSaI71xkXr3ayZy2SIix0YumRS6AwEnLmr58WS9z2pKlYcJCCGzcXOU81Xuhp1osIWbBiUQWehda7lTvaNeCJX0WbYgksMA0hdlLo6zDp1PEomIdVu7YE4wN7nH7uGPdHXz2R3uHnX68tcP6SPE5ZSdObNpN/9dybtfmr6tHoy6+rN+DqdvnW9lUbkHTdcUWfKp1yzVr5Ag5HCqGU0Hca3jpAt2GiWFRwxYvdpYFo2b3tN/HvLeFd+BAr5Bu7CXnzKFlJb8dtP3ucx1djc+589Pep+W7X706stfvml+7i8fsWunxp7/f/uzsrgzj9Sv3p+6T7yqwvrfdy3nk/J6eZ84fnHp2lSvf/m/7H7569dDvuY/fTX+Mwdog+QVAGyB/IHmGyK8/exQrX13Maucu+y23rrbi5tQ1T3yTor3oj4kV8a8VtyxSqtQwKyXLbJF2kaI5DgAkYGICPzQG4dwfQxPVOhMEOlExSEJJAg2dTFSRhcCBRVEIQacCmBSkxnqLCAaiIZQBFGAiAIGH3SBxcRo0PFxBFXkPHETzDkLwCA1MfCJiR4tswStWxeEccIPlAbXSxS1rYEH2G0U8ZpeU+sw/Oq+80JR1NjrghW6MOT6JNgQO3NEJPTgPj4PAONK4hlKGYLqq4mVvKlc6M0YVh3PADZYH1EoXd8sHlvv+G0U8ZldDq/D+0XnVPTRl3QIdVFcr2rX090m0IXA8jjs6oYcOPMwQgSkfpnENpewRMF2FSvG2qnJ+zfmE6wATY6YSUmhCCQehg9V8advwun0+nHuJ0VP0kYrcz/Qox5hl') format('woff2');
	}

	.icon {
		font-family: "HMfont-home" !important;
		font-size: 60upx;
		font-style: normal;
		color: #ffffff;

		&.scan {
			&:before {
				content: "\e69a";
			}
		}

		&.menu {
			&:before {
				content: "\e62b";
			}
		}

		&.search {
			&:before {
				content: "\e628";
			}
		}
	}

	page {
		background-color: #fff;
	}

	.status {
		width: 100%;
		height: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);
		/*  #endif  */
		background-color: #ff570a;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.header {
		width: 100%;
		height: 100upx;
		background-color: #ff570a;
		display: flex;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		z-index: 996;

		.scan {
			width: 100upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.input {
			width: calc(100% - 200upx);
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			input {
				width: calc(100% - 60upx);
				height: 60upx;
				background-color: #ffffff;
				border-radius: 60upx;
				padding-left: 60upx;
				font-size: 30upx;

			}

			.icon {
				width: 60upx;
				height: 60upx;
				position: absolute;
				color: #a18090;
				z-index: 996;
				top: 20upx;
				left: 0;
				font-size: 40upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.menu {
			width: 100upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 60upx;
				height: 60upx;
				border-radius: 60upx;
			}
		}
	}

	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		background-color: #ff570a;
		height: 100upx;
	}

	.swiper-view {
		.swiper {
			width: 100%;
			height: 280upx;

			image {
				width: 100%;
				height: 280upx;
			}
		}

		.keep-out {
			width: 100%;
			height: 30upx;
			border-radius: 100% 100% 0 0;
			background-color: #ff570a;
			margin-top: -15upx;
			position: absolute;
		}
	}

	.category {
		width: 95%;
		padding: 2.5vw 2.5vw;
		background-color: #ff570a;

		.box {
			width: 100%;
			border-radius: 20upx;
			background-color: #ffffff;

			.dots {
				display: flex;
				justify-content: center;
				height: 15upx;
				width: 100%;

				view {
					width: 30upx;
					height: 5upx;
					background-color: rgba(0, 0, 0, 0.2);

					&.active {
						background-color: #ff570a;
					}
				}
			}

			.swiper {
				width: 100%;
				padding: 20upx 0;

				.uni-swiper-dot {
					width: 20upx;
				}

				.category-list {
					width: 100%;
					height: auto;
					display: flex;
					justify-content: flex-start;
					padding: 10upx 0;
					flex-flow: wrap;

					.icon {
						width: 20%;
						display: flex;
						flex-flow: wrap;
						justify-content: center;
						font-size: 22upx;
						color: #666;

						image {
							// width: 70%;
							// height: 13.3vw;
							width: 75rpx;
							height: 100rpx;
						}

						view {
							width: 100%;
							display: flex;
							justify-content: center;
						}
					}
				}
			}
		}
	}

	.pick {
		width: 95%;
		padding: 0 2.5vw 2.5vw 2.5vw;
		background: linear-gradient(to bottom, #ff570a 0%, #ffffff 105%);

		.box {
			width: 100%;
			border-radius: 20upx;
			background-color: #ffffff;

			.title {
				display: flex;
				justify-content: flex-start;
				align-items: flex-end;
				height: 60upx;
				border-bottom: solid 1upx #eee;
				padding-bottom: 10upx;

				.big {
					font-size: 34upx;
					padding-left: 20upx;
					color: #46434f;
				}

				.small {
					font-size: 24upx;
					padding-left: 20upx;
					color: #827f8b;
				}
			}

			.product-list {
				padding: 15upx 20upx 15upx 20upx;
				column-count: 2;
				column-width: 50%;
				column-gap: 10upx;

				>view {
					display: flex;
					background-color: #f8f8f8;
					position: relative;

					&:nth-child(1) {
						.price {
							color: #e65339;
							font-size: 30upx;
							position: absolute;
							bottom: 8upx;
							left: 8upx;
						}

						.slogan {
							color: #807c87;
							font-size: 30upx;
							position: absolute;
							bottom: 8upx;
							right: 8upx;
						}

						image {
							width: 100%;
							height: 0;
						}
					}

					&:nth-child(2),
					&:nth-child(3) {
						image {
							width: calc(50% - 5upx);
							height: 0;
						}

						.price {
							position: absolute;
							top: 25%;
							left: 55%;
							color: #e65339;
							font-size: 30upx;
						}

						.slogan {
							position: absolute;
							top: 60%;
							left: 55%;
							color: #807c87;
							font-size: 20upx;
						}
					}

					&:nth-child(2) {
						margin-bottom: 10upx;
					}
				}
			}
		}
	}

	.banner {
		image {
			width: 100%;
		}
	}

	.goods-list {
		background-color: #f4f4f4;

		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 95%;
			padding: 0 2.5% 2.5vw 2.5%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48.75%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}

		}
	}
</style>
