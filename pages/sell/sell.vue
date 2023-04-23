<template>
	<view>
		<!-- 状态栏 -->
		<view class="status" :style="{position:headerPosition}"></view>
		<!-- 漂浮头部 -->
		<view class="header" :style="{position:headerPosition}">
			<view class="scan">
				<u-icon name="grid-fill" color="#ffffff" size="28" @tap="scan"></u-icon>
			</view>
			<view class="input">
				<view class="icon search"></view>
				<input disabled placeholder="点击搜索" @tap="toSearch()" />
			</view>
			<view class="menu">
				<image mode="widthFix" :src="userImage"></image>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<view class="waterfall-box h-flex-x h-flex-2">
			<view>
				<helang-waterfall v-for="(item,index) in leftList" :key="index" :params="item" tag="left" :index="index"
					@height="onHeight" @click="onClick(item.id,item.userId)"></helang-waterfall>
			</view>
			<view>
				<helang-waterfall v-for="(item,index) in rightList" :key="index" :params="item" @height="onHeight"
					@click="onClick(item.id,item.userId)" tag="right" :index="index"></helang-waterfall>
			</view>
		</view>
		<view class="load-txt">{{ajax.loadTxt}}</view>
	</view>
</template>

<script>
	import helangWaterfall from "@/uni_modules/helang-waterfall/components/helang-waterfall/helang-waterfall"
	export default {
		components: {
			"helang-waterfall": helangWaterfall
		},
		data() {
			return {
				leftHeight: 0,
				rightHeight: 0,
				leftList: [],
				rightList: [],
				Jerry_data: [],
				headerPosition:"fixed",
				userImage:"",
				way:"学生上传",
				ajax: {
					// 是否可以加载
					load: true,
					// 加载中提示文字
					loadTxt: '',
					// 每页的请求条件
					rows: 10,
					// 页码
					page: 1,
				}
			}
		},
		onReady() {
			this.getList();
		},
		// 触底触发
		onReachBottom() {
			this.getList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 正常情况下接口返回应该很会很快。故意延迟调用，让用户有在刷新的体验感
			setTimeout(() => {
				this.ajax.page = 1;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.ajax.load = true;
				this.getList();
			}, 800);
		},
		methods: {
			/////
			scan(){
				uni.navigateTo({
					url:"../category/index"
				})
			},
			toSearch(){
				uni.navigateTo({
					url:"../sell/search"
				})
			},
			//////
			// 监听高度变化
			onHeight(height, tag) {
				if (tag == 'left') {
					this.leftHeight += height;
				} else {
					this.rightHeight += height;
				}
			},
			// 组件点击事件
			onClick(index, tag) {
				// console.log(index, tag);
				uni.setStorageSync("bookId",index);
				uni.navigateTo({
					url:"../detail/detail?bookId="+index+"&userId="+tag,
				})
				// 对应的数据
				if (tag == 'left') {
					// console.log(this.leftList[index]);
					
				} else {
					// console.log(this.rightList[index]);
				}
				let direction = {
					"left": '左',
					"right": '右'
				}
				// uni.showToast({
				// 	title: `${direction[tag]}侧列表第${index+1}个被点击`,
				// 	icon: 'none'
				// })
			},
			// 获取数据
			getList() {
				/* 
					无真实数据，当前由 setTimeout 模拟异步请求、
					自行替换 请求方法将数据 传入 addList() 方法中
					自行解决数据格式，自行修改组件内布局和内容绑定
				*/
				if (!this.ajax.load) {
					return;
				}
				this.ajax.load = false;
				this.ajax.loadTxt = '加载中';
				let that = this;
				let res = [];
				this.$JerryRequest({
					url: "/getBook"
				}).then(result => {
					that.Jerry_data = [...this.Jerry_data, ...result.data];
					for (let i = 0; i < this.Jerry_data.length; i++) {
						res.push({
							url: this.Jerry_data[i].image,
							title: this.Jerry_data[i].title,
							money: this.Jerry_data[i].price,
							id: this.Jerry_data[i].id,
							userId:this.Jerry_data[i].userId,
							label: this.Jerry_data[i].direct?"书城直售":"学生自送",
							shop: this.Jerry_data[i].direct?'书城自营旗舰店':this.way,
						})
					}
					this.addList(res)
				})
			},
			addList(res) {
				// 获取到的数据，请注意数据结构

				if (!res || res.length < 1) {
					this.ajax.loadTxt = '没有更多了';
					return;
				}

				// 左右列表高度的差
				let differ = this.leftHeight - this.rightHeight;
				// 计算差值，用于确定优先插入那一边
				let differVal = 0;

				// 初始化左右列表的数据
				let i = differ > 0 ? 1 : 0;

				let [left, right] = [
					[],
					[]
				];


				// 获取插入的方向
				let getDirection = (index) => {
					/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
					if (differ >= 600 && index < 3) {
						differVal = 1;
						return 'right';
					}

					/* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
					if (differ <= -600 && index < 3) {
						differVal = -1;
						return 'left';
					}

					/* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
					if (differ >= 350 && index < 2) {
						return 'right';
					}
					/* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
					if (differ <= -350 && index < 2) {
						differVal = -1;
						return 'left';
					}

					/* 当前数据序号为偶数时，则插入到左边 */
					if ((i + differVal) % 2 == 0) {
						return 'left';
					} else {
						/* 当前数据序号为奇数时，则插入到右边 */
						return 'right';
					}
				}

				// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
				res.forEach((item, index) => {
					if (getDirection(index) == 'left') {
						//console.log(`差值：${differ},方向：left，序号${index}`)
						left.push(item);
					} else {
						//console.log(`差值：${differ},方向：right，序号${index}`)
						right.push(item);
					}
					i++;
				});

				// 将左右列表的数据插入，第一页时则覆盖
				if (this.ajax.page == 1) {
					this.leftList = left;
					this.rightList = right;
					uni.stopPullDownRefresh();
				} else {
					this.leftList = [...this.leftList, ...left];
					this.rightList = [...this.rightList, ...right];
				}

				this.ajax.load = true;
				this.ajax.loadTxt = '上拉加载更多';
				this.ajax.page++;
			}
		},
		onShow() {
			if (!uni.getStorageSync("id")) {
				uni.showModal({
					title: '您还未登录',
					confirmText: '去登陆',
					showCancel: false,
					success(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '../profile/profile'
							})
						} else {
							uni.switchTab({
								url: '../profile/profile'
							})
						}
					}
				})
			}else {
				this.userImage = uni.getStorageSync("image");
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}
</style>

<style lang="scss" scoped>
	.waterfall-box {
		padding: 20rpx 10rpx;
		box-sizing: border-box;

		>view {
			padding: 0 10rpx;
		}
	}

	.h-flex-x {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		&.h-flex-2 {
			>view {
				width: 50%;
			}
		}
	}

	.load-txt {
		padding: 0 0 20rpx 0;
		text-align: center;
		color: #999;
		font-size: 24rpx;
	}

	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		background-color: #ff570a;
		height: 100upx;
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
</style>
