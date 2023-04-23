<template>
	<view class="top">
		<view class="image">
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1">
			</u-upload>
		</view>
		<view class="input_box">
			<textarea v-model="textBlock" class="myText" placeholder="输入留言板给同学们留言" maxlength="60"></textarea>
		</view>
		<u-button class="ubtn" type="primary" @click="submit">提交</u-button>
		<u-modal :show="show" showCancelButton @confirm="confirm" @cancel="cancel" :title="title" :content='content'></u-modal>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				fileList1: [],
				show: false,
				title: '留言板',
				content: '是否提交留言板',
				textBlock:"",
				imageUrl:"",
				list:[],
			}
		},
		computed: {
			...mapState(['username'])
		},
		methods: {
			submit(){
				if(!this.textBlock){
					this.$Inter.JerryAlert("请输入内容");
					return ;
				}else{
					this.show = true;
				}
				
			},
			confirm(){
				let ob = {};
				ob.text = this.textBlock;
				ob.username = uni.getStorageSync("username");
				ob.mobile = uni.getStorageSync("mobile");
				ob.image = this.imageUrl;
				ob.user_id = uni.getStorageSync("id");
				ob.user_image = uni.getStorageSync("image");
				this.list.push(ob);
				this.$api.insertMessage(this.list);
				this.textBlock = "";
				this.imageUrl = "";
				this.fileList1.splice(0,1)
				this.show = false;
			},
			cancel(){
				this.show = false;
			},
			async afterRead(event) {
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
				let that = this;
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://localhost:8080/qiniu/image', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							that.imageUrl = res.data;
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1);
			},
		},
		onShow() {
			if (!uni.getStorageSync("username")) {
				uni.showModal({
					title: '您还未登录',
					confirmText: '去登陆',
					showCancel: false,
					success(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '../profile/profile'
							})
						} else {
							uni.switchTab({
								url: '../profile/profile'
							})
						}
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.myText {
		width: 100%;
	}
	.input_box {
		width: 500rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		border: 1px solid #eeeeee;
		margin: 0 auto 6px auto;
	}

	.btn {
		width: 300rpx;
	}

	.image {
		height: 180rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.ubtn {
		width: 50%;
	}
</style>
