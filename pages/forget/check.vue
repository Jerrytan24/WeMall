<template>
	<view class="sunui">
		<view class="sunui-title"></view>
		<sunui-mverify @change="mverify"></sunui-mverify>
	</view>
</template>

<script>
	import sunuiMverify from '@/components/sunui-mverify/sunui-mverify.vue';
	export default {
		data() {
			return {

			}
		},
		components: {
			sunuiMverify
		},
		methods: {
			mverify(e) {
				setTimeout(() => {
					uni.navigateTo({
						url: "./index"
					})
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
