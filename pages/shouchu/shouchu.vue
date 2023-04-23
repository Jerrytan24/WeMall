<template>
	<view class="top">
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			async dataGet(user_id){
				const res = await this.$JerryRequest({
					url:"/getOrderByUserProfile?user_id="+user_id,
					token:uni.getStorageSync("token"),
				})
			}
		},
		components:{
			
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss" scoped>
</style>
