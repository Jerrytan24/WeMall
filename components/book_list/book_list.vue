<template>
	<view class="bottom_div">
		<view class="bottom_div_view" v-for="(item) in JerryData" @click="Mydetail(item.id,item.userId)" :key="item.id">
			<image :src="item.image"></image>
			<view class="info">
				<p class="bottom_div_title">
					<nobr>{{item.title}}</nobr>
				</p>
				<p class="isbn">{{9782546012312}}</p>
			</view>
			<view class="info">
				<nobr class="shopWay">{{item.direct?unWay:stWay}}</nobr>
			</view>
			<view class="price">
				<p class="p1">￥{{item.price}}</p>
				<p class="p2">{{item.collect}}人收藏</p>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// Mydata: []
				stWay: "学生自送",
				unWay: "书城直售"
			}
		},
		props: {
			JerryData: {
				type: Array,
				default: []
			},
			JerryCollects: {
				type: String | Number,
				default: "0",
				required: true
			}
		},
		methods: {
			Mydetail: function(id, userId) {
				uni.setStorageSync("bookId", id);
				uni.navigateTo({
					url: "../../pages/detail/detail?bookId=" + id + "&userId=" + userId,
				})
			},
			async dataGet() {
				const res = await this.$JerryRequest({
					url: '/getBook'
				})
				// this.JerryData = res.data; 
				// console.log(...this.JerryData)这行代码的上一行代码有稍微改动
			}
		},
		created() {
			if (this.JerryCollects === "1") {
				console.log(this.JerryCollects)
				this.dataGet();
			}
		},
	}
</script>
<style lang="scss">
	.bottom_div {
		display: flex;
		flex-wrap: wrap;
		flex: 1;
		margin-top: 7px;

		.bottom_div_view {
			margin: 15px 3px 5px 2px;
			width: 360rpx;
			height: 500rpx;
			text-align: center;
			background-color: white;

			image {
				width: 280rpx;
				height: 300rpx;
			}

			.info {
				margin-top: 14rpx;
				margin-left: 40rpx;
				text-align: left;

				.bottom_div_title {
					text-overflow: ellipsis;
					color: black;
					overflow: hidden;
					font-size: 13px;
				}

				.isbn {
					color: red;
					font-size: 12px;
					margin-top: 10rpx;
				}
			}

			.price {
				margin-top: 30rpx;

				.p1 {
					color: red;
					font-size: 14px;
					display: inline-block;
					margin-right: 60rpx;
				}

				.p2 {
					color: #828282;
					font-size: 12px;
					display: inline-block;
					margin-left: 52rpx;
				}
			}

		}
	}
	.shopWay {
		text-align: left;
		background-color: #ff0000;
		height: 16px;
		border-radius: 8px;
		font-size: 14px !important;
		color: #FFFFFF;
	}
</style>
