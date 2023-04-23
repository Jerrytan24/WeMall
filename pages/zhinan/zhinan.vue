<template>
	<view>
		<u-collapse @change="change" @close="close" @open="open">
			<u-collapse-item title="使用指南" name="Docs guide">
				<text class="u-collapse-content">APP主要用四个大功能，第一个就是支持用户上传图书售卖图书，第二个就是用户可以查询，购买图书，第三个就是可以在动态圈发表动态获取图书，第四个是可以作为渠道获取用户信息进行线下交易</text>
			</u-collapse-item>
			<u-collapse-item title="WeMall书城" name="Variety components">
				<text class="u-collapse-content">WeMall二手书城主要由APP端上传发布，下单购买，PC端进行订单的操作，书城的售卖模式主要有三种，一个是学生之间线下交易，一种就是书城直售，一种就是书城线上交易</text>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: { 
			open(e) {
				// console.log('open', e)
			},
			close(e) {
				// console.log('close', e)
			},
			change(e) {
				// console.log('change', e)
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
