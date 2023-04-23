<template>
	<view class="head">
		<u-swiper :list="list3" previousMargin="30" interval="4000" nextMargin="30" height="160" circular :autoplay="true" radius="5"
			bgColor="#ffffff"></u-swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list3:[
					'../../static/lunbo/01.jpg',
					'../../static/lunbo/02.jpg',
					'../../static/lunbo/03.jpg',
					'../../static/lunbo/04.jpg'
					
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.head {
		position: relative;
		height: 450rpx;
		margin-top: 10px;

	}

	.swiper swiper-item {
		image {
			width: 100%;
			// height: 350rpx;
		}

		height: 100%;
	}

	.wrap {
		width: 750rpx;
		height: 300rpx;
		background-image: url("https://gitee.com/jerry-mall/static/raw/master/images/bg.jpg");
	}

	.swiper {
		overflow: hidden;
		height: 360rpx;
		border-radius: 7px;
		position: relative;
		margin: 0 auto;
		width: 680rpx;
	}
</style>
