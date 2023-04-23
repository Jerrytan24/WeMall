<template>
	<view class="city">		
		<view @click="showcity">地址选择</view>
		<view class="city-box" :v-show="showbox">
			<view @click="close" class="close">关闭</view>
			<semp-city @confirm="onCityConfirm" platform="jd"></semp-city>
		</view>
	</view>
</template>

<script>
	import cityData from '../../common/city.data.js';
	export default {
		data() {
			return {
				showbox:false
						
			};
		},
	
		methods:{
				showcity(){
					this.showbox=true;
				
				},
				close(){
					this.showbox=false;
				}
		},
		computed: {
			
		}
		
	
	}

</script>

<style>
	view{
		color:#f2f2f2;
		display: flex;
		flex-direction: column;
	}
	.city{
		background:rgba(0,0,0,.5)
	
	}
	.city-box{
		height:800upx;
		padding:20upx;
		position:fixed;
		left:0;
		bottom:0;
		z-index:999;
		background:#fff;
	
	
	}
	.close{
		color:#666;
		height:80upx;
	}
</style>
