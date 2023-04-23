<template>
	<u-list @scrolltolower="scrolltolower">
		<u-list-item v-for="(item, index) in fromUser" :key="index" >
			<u-cell :title="item" @click="navigateUser(item)">
				<u-avatar slot="icon" shape="square" size="35" :src="urls" customStyle="margin: -3px 5px -3px 0">
				</u-avatar>
			</u-cell>
		</u-list-item>
	</u-list>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				indexList: [],
				urls:"https://cdn.uviewui.com/uview/album/1.jpg"
			}
		},
		onLoad() {
			this.loadmore();
			this.$store.dispatch("setShowToast",false);
		},
		methods: {
			async dataGet(username){
				const res = await this.$JerryRequest({
					url:"/getImageByUsername?username="+username
				});
				uni.navigateTo({
					url:"../chat/index?username="+username+"&userImage="+res.data
				})
			},
			navigateUser(item){
				this.dataGet(item);
			},
			scrolltolower() {
				this.loadmore()
			},
			loadmore() {
				for (let i = 0; i < 30; i++) {
					this.indexList.push({
						url: this.urls[uni.$u.random(0, this.urls.length - 1)]
					})
				}
			}
		},
		computed:{
			...mapState({
				"fromUser":"fromUser"
			},
			{
				"fromUserText":"fromUserText"
			},{
				"showToastMine":"showToastMine"
			})
		}
	}
</script>

<style lang="scss">
	.head {
		.view {
			height: 80rpx;
			width: 100%;
			border-bottom: 2px solid #eee;
			line-height: 80rpx;

			.square {
				display: inline-block;
				border: 3px solid #eee;
				border-bottom: 0px;
				border-left: 0px;
				width: 28rpx;
				height: 28rpx;
				transform: rotate(45deg);
				margin-left: 75%;
			}

			text {
				font-size: 13px;
			}
		}
	}
</style>
