<template>
	<view>
		<u-popup :show="OrderShow" :round="10" @close="close" @open="open" mode="bottom">
			<view class="top">
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="3">
				</u-upload>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		name: "bookOrderPopup",
		data() {
			return {
				count: 4,
				value: 2,
				fileList1: [],
			};
		},
		props: {
			complete_id:{
				type:Number,
				default:0
			},
			book_id:{
				type:Number,
				default:0
			}
		},
		methods: {
			open() {},
			close() {
				this.$store.state.OrderShow = false;
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		},
		computed: {
			...mapState({
				'OrderShow': 'OrderShow'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		width: 100%;
		height: 1000rpx;
		background-color: #EEEEEE;
	}
</style>
