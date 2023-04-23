<template>
	<view>
		<collect :list="list"></collect>
	</view>
</template>

<script>
	import collect from "@/components/sellerComplete.vue"
	export default {
		data(){
			return {
				list:[],
			}
		},
		methods:{
			async dataGet(seller_id){
				const res = await this.$JerryRequest({
					url:"/getBookByComplete?seller_id="+seller_id,
					token:uni.getStorageSync("token"),
				})
				this.list = res.data;
				console.log(this.list);
			}
		},
		components:{
			collect,
		},
		onShow() {
			this.dataGet(uni.getStorageSync("id"));
		}
	}
</script>

<style lang="scss" scoped>
</style>
