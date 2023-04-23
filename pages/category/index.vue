<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
			<view 
			@click="leftClickHandle(index,item.id)"
			:class="active===index?'active':''" 
			v-for="(item,index) in cates" 
			:key="item.id">
			  {{item.title}}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="item in secondData" :key="item.id" @click="scanItem(item.id,item.user_id)">
				<view class="imageView">
					<image :src="item.image"></image>
				</view>
				<view class="info">
					<text>书名：{{item.title}}</text>
				</view>
			</view>
			<text v-if="secondData.length === 0">暂无数据</text>
		</scroll-view>
	</view>
</template>

				
<script>
	export default {
		data() {
			return {
				cates: [],
				active: 0,
				secondData: []
			}
		},
		methods: {
			scanItem(bookId,userId){
				uni.navigateTo({
					url:"../detail/detail?bookId="+bookId+"&userId="+userId,
				})
			},
			async getPicsCate () {
				const res = await this.$JerryRequest({
					url: '/getCategory'
				})
				this.cates = res.data;
				this.leftClickHandle(0,this.cates[0].id)
			},
			async leftClickHandle (index,id) {
				let that = this;
				this.active = index
				// 获取右侧的数据
				const res = await this.$JerryRequest({
					url: '/tableName?id='+id,
				})
				this.secondData = res.data
			},
		},
		onLoad () {
			this.getPicsCate()
		}
	}
</script>

<style lang="scss">
page{
	height: 100%;
}
.info {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.pics{
	height: 100%;
	display: flex;
	.left{
		width: 200rpx;
		height: 100%;
		border-right:1px solid #eee;
		view{
			height: 60px;
			line-height: 60px;
			color: #333;
			text-align: center;
			font-size: 30rpx;
			border-top:1px solid #eee;
		}
		.active{
			background: #ff510a;
			color: #fff;
		}
	}
	.right{
		height: 100%;
		width: 520rpx;
		margin: 10rpx auto;
		.item{
			text-align: left;
			padding: 5px 15px;
			background-color: #FFFFFF;
			border-radius: 5px;
			box-shadow: 10px 10px 5px #888888;
			margin-bottom: 20px;
			image{
				width: 200rpx;
				height: 250rpx;
				border-radius: 5px;
				display: block;
				margin-left: 150rpx;
			}
			text{
				font-size: 28rpx;
				line-height: 60rpx;
			}
		}
	}
}
</style>
