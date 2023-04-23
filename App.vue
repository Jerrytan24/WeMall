<script>
	
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			// #ifdef APP-PLUS
			plus.push.addEventListener("click", function(message) {
				let payload = message;
				try {

				} catch (e) {

				}
			});
			plus.push.addEventListener("receive", function(message) {
				let payload = message;
				try {

				} catch (e) {

				}
			});
			// #endif
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import url("/static/font/iconfont.css");

	/*每个页面公共css */
	.flexCenter {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	page {
		min-height: 100%;
		background-color: #ede8ee;
		height: 100%;
		font-size: 14px;
		line-height: 1;
	}
</style>
