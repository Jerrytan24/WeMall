<template>
	<view class="top">
		<u-swipe-action>
			<u-swipe-action-item :options="options" v-for="(item,index) in list" :key="item.id"
				@click="tap(index,item.collectId)">
				<view class="swipe-action u-border-top" :class="[index === list.length - 1 && 'u-border-bottom']">
					<view class="swipe-action__content card"
						@click.stop="purchase(index,item.id,item.image,item.title,item.price,item.sellerId)">
						<view class="image">
							<image :src="item.image" @error="Error(index)"></image>
						</view>
						<view class="info">
							<p class="title">书名：{{item.title}}</p>
							<p class="author">作者：{{item.author}}</p>
							<p class="price">¥{{item.price}}</p>
						</view>
					</view>
				</view>
			</u-swipe-action-item>
		</u-swipe-action>
		<u-modal :show="show" @confirm="confirm" @cancel="cancel" showCancelButton :title="title" :content='content'>
		</u-modal>
		<u-keyboard mode="number" @change="valChange" @backspace="backspace" closeOnClickOverlay @cancel="keyboradCancel" @confirm="submit" :dotDisabled="true" :show="keyboardShow">
			<slot><view class="slot">{{code}}</view></slot>
		</u-keyboard>
	</view>
</template>

<script>
	export default {
		name: "userCollect",
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#f9ae3d',
					}
				}, ],
				show: false,
				keyboardShow: false,
				title: "下单",
				content: "是否下单",
				book_id: 0,
				price: 0,
				bookIndex: 0,
				sellerId: 0,
				address: "广东省广州市中山大道西293号前面",
				value:"",//键盘的值
				code:"",
			};
		},
		props: {
			list: {
				type: Array || Object,
				required: true,
				default: []
			},
		},
		methods: {
			keyboradCancel(){
				this.value = "";
				this.code="";
				this.keyboardShow = false;
			},
			submit(){
				let now = new Date();
				let month = now.getMonth() + 1; //月
				let day = now.getDate();
				let temp = "";
				temp = month+"."+day;
				this.$api.insertUserOrder(this.book_id, 1, this.price, uni.getStorageSync("id"), this.sellerId,uni.getStorageSync("username"),uni.getStorageSync("mobile"),this.address,temp);
				this.keyboardShow = false;
				this.value = "";
				this.code="";
				this.$Inter.JerryAlert("下单成功");
			},
			confirm() {
				this.show = false;
				this.keyboardShow = true;
			},
			cancel() {
				this.show = false;
			},
			purchase(index, id, image, title, price, sellerId) {
				this.book_id = id;
				this.price = price;
				this.bookIndex = index;
				this.sellerId = sellerId;
				this.show = true;
			},
			Error(index) {
				this.list[index]['image'] = '../../static/nofound.jpg'
			},
			tap(index, collectId) {
				this.$JerryRequest({
					url: "/deleteUserCollectById?collect_id=" + collectId,
					method: "DELETE",
					token:uni.getStorageSync("token")
				})
				this.list.splice(index, 1);
			},
			valChange(val) {
				let now = new Date();
				let month = now.getMonth() + 1; //月
				let day = now.getDate();
				let temp = "";
				temp = month+"."+day;
				// 将每次按键的值拼接到value变量中，注意+=写法
				this.value += val;
				this.code+='●'
				if(this.value.length>6){
					this.keyboardShow = false;
					this.$api.insertUserOrder(this.book_id, 1, this.price, uni.getStorageSync("id"), this.sellerId,uni.getStorageSync("username"),uni.getStorageSync("mobile"),this.address,temp);
					this.$Inter.JerryAlert("下单成功");
					this.value = "";
					this.code="";
				}
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if (this.value.length) this.value = this.value.substr(0, this.value.length - 1);
				console.log(this.value);
			}
		},
	}
</script>

<style lang="scss">
	.slot {
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		color: #000000;
	}
	.top {
		background-color: #EEEEEE;
	}

	.card {
		display: flex;
		background-color: #FFFFFF;
		height: 230rpx;
		margin-bottom: 10px;
	}

	.image {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			height: 200rpx;
			width: 200rpx;
		}

		flex: 1;

	}

	.info {
		flex: 2;

		.title {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			margin-top: 3px;
			font-size: 14px;
			font-weight: 800;
		}

		.author {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
			margin-top: 4px;
		}

		.price {
			margin-top: 6px;
			color: #ff0000;
		}
	}

	.u-page {
		padding: 0;
	}

	.u-demo-block__title {
		padding: 10px 0 2px 15px;
	}

	.swipe-action {
		&__content {
			padding: 25rpx 0;

			&__text {
				font-size: 15px;
				color: $u-main-color;
				padding-left: 30rpx;
			}
		}
	}
</style>
