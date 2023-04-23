<template>
	<view></view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		}
		onLoad(options) {
			if(JSON.stringify(options.id) === '0'){
				uni.redirectTo({
					url:'../cart/cart'
				})
			}
		},
		activated() {
			un.redirectTo({
				url:'../cart/cart'
			}) 
		}
	}
</script>

<style>
</style>
