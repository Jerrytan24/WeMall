<template>
	<view class="top">
		<u-subsection mode="subsection" activeColor="#ff510a" :list="list" :current="curNow" @change="sectionChange">
		</u-subsection>
		<book-order :list="BookData" v-if="show"></book-order>
		<book-fahuo v-if="show1" :list="BookFaHuo"></book-fahuo>
		<book-complete v-if="show2" :list="BookDataComplete"></book-complete>
	</view>

</template>

<script>
	import bookOrder from "@/components/bookOrderComponents.vue"
	import bookComplete from "@/components/bookOrderComplete.vue"
	import bookFahuo from "@/components/bookOrderFahuo.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				BookData: [],
				BookDataComplete:[],
				BookFaHuo: [],
				list: ['待发货','已发货', '已收货'],
				curNow: 0,
				show:true,
				show1: false,
				show2: false,
			}
		},
		methods: {
			async dataGet(user_id) {
				const res = await this.$JerryRequest({
					url: "/getUserOrder?user_id=" + user_id,
					method: "GET",
					token:uni.getStorageSync("token")
				})
				this.BookData = res.data;
			},
			sectionChange(index) {
				let that = this;
				this.curNow = index;
				if(this.curNow == 1){
					this.show = false;
					this.show1 = true;
					this.show2 = false;
					this.$JerryRequest({
						url:"/getBookFaHuoByUser?user_id="+uni.getStorageSync("id"),
						token:uni.getStorageSync("token")
					}).then(res => {
						that.BookFaHuo = res.data;
					})
				}
				if(this.curNow === 0){
					this.show = true;
					this.show1 = false;
					this.show2 = false;
				}
				if(this.curNow === 2){
					this.show = false;
					this.show1 = false;
					this.show2 = true;
					this.$JerryRequest({
						url:"/getUserOrderComplete?user_id="+uni.getStorageSync("id"),
						token:uni.getStorageSync("token")
					}).then(res => {
						that.BookDataComplete = res.data;
					})
				}
			}
		},
		computed: {
			...mapState(['usernameId'])
		},
		created() {

		},
		components: {
			bookOrder,
			bookComplete,
			bookFahuo
		},
		onShow() {
			this.dataGet(uni.getStorageSync("id"));
		}
	}
</script>

<style lang="scss">
	.top {
		width: 100%;
		height: 100%;
		background-color: #EEEEEE;
	}
	page {
		background-color: #EEEEEE;
	}
</style>
