<template>
	<view>
		<u-modal :show="show" @confirm="evt" :content='content' showConfirmButton></u-modal>
		<usercollect :list="JerryCollect"></usercollect>
	</view>
</template>
<script>
	import usercollect from "@/components/userCollect.vue"
	export default {
		data() {
			return {
				JerryCollect: [],
				JerryCollectData: '',
				userId: 0,
				show: false,
				content: '您尚未登录,点击确认跳转登录页面',
			}
		},
		onLoad() {
			this.userId = uni.getStorageSync("id");
			this.getData(this.userId);
		},
		methods: {
			evt() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			async getData(userId) {
				const res = await this.$JerryRequest({
					url: "/getusercollectBook?user_id=" + userId,
					token:uni.getStorageSync("token")
				})
				this.JerryCollect = res.data;
			}
		},
		components: {
			usercollect,
		},
		onShow() {
			if (!uni.getStorageSync("username")) {
				this.show = true;
			}
		},
	}
</script>

<style lang="scss">
	.album {
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 5px;
			border-radius: 3px;
		}

		&__content {
			margin-left: 10px;
			flex: 1;
		}
	}
</style>
