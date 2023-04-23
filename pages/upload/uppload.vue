<template>
	<view class="container">
		<view class="wrap">
			<view class="top">
				<view class="image">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="1"></u-upload>
				</view>
				<view class="price isbn">
					<view class="flexCenter">书名：</view>
					<view class="flexCenter">
						<u--input v-model="bookTitle" placeholder="请输入书名" maxlength="20" type="text" border="none"
							clearable></u--input>
					</view>
					<view class="iconfont icon-tushu"></view>
				</view>
				<view class="isbn">
					<view class="flexCenter">序列：</view>
					<view class="flexCenter">
						<u--input v-model="bookIsbn" placeholder="请输入ISBN" maxlength="15" type="number" border="none"
							clearable></u--input>
					</view>
					<view class="iconfont icon-xuliehao"></view>
				</view>
				<view class="price isbn">
					<view class="flexCenter">价格：</view>
					<view class="flexCenter">
						<u--input v-model="bookPrice" placeholder="请输入价格" maxlength="3" type="number" border="none"
							clearable></u--input>
					</view>
					<view class="iconfont icon-jiage"></view>
				</view>
				<view class="mobile isbn">
					<view class="flexCenter">电话：</view>
					<view class="flexCenter">
						<u--input v-model="bookMobile" placeholder="请输入电话" maxlength="12" type="number" border="none"
							clearable></u--input>
					</view>
					<view class="iconfont icon-dianhua"></view>
				</view>
				<view class="author isbn">
					<view class="flexCenter">作者：</view>
					<view class="flexCenter">
						<u--input v-model="bookAuthor" placeholder="请输入作者" maxlength="12" type="text" border="none"
							clearable></u--input>
					</view>
					<view class="iconfont icon-gaojian-zuozhe"></view>
				</view>
				<view class="num isbn">
					<view class="flexCenter">数量：</view>
					<view class="flexCenter">
						<u--input v-model.number="bookNumber" placeholder="请输入数量" maxlength="3" type="number"
							border="none" clearable></u--input>
					</view>
					<view class="iconfont icon-taizhanshuliang"></view>
				</view>
			</view>
			<view class="category">
				<view class="view1">
					<u-tag class="uBtn" :text="cateselec" @click="cateSelect">
					</u-tag>
				</view>
				<view class="view2">
					<u-tag class="uTag" :text="cateContent" type="error"></u-tag>
				</view>
			</view>
		</view>
		<view class="bottom">
			<u-button type="error" color="#ff510a" text="上传" @click="submit"></u-button>
		</view>
		<u-modal :show="show" @cancel="cancel" @confirm="confirm" :title="title" showCancelButton :content='content'>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],
				cate: [],
				cateIndex: 0,
				show: false,
				title: "",
				content: "确定上传嘛？",
				cateContent: "历史",
				cateselec: "选择分类",
				bookTitle: "",
				bookIsbn: "",
				bookPrice: "",
				bookMobile: "",
				imageUrl: "",
				bookNumber: 1, //用户上传的书籍数量
				bookAuthor: "",
				fileInfo:[],
			}
		},
		methods: {
			async dataGet() {
				const res = await this.$JerryRequest({
					url: "/getCategory"
				})
				res.data.map(item => {
					if (item.title) {
						this.cate.push(item.title);
					}
				})
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
			submit() { 
				this.show = true;
			},
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1);
			},
			cateSelect() {
				let that = this;
				uni.showActionSheet({
					itemList: this.cate,
					success: function(res) {
						that.cateContent = that.cate[res.tapIndex];
						that.cateIndex = res.tapIndex + 1;
					},
					fail: function(res) {

					}
				});
			},
			confirm() {
				if (!this.bookTitle) {
					this.$Inter.JerryAlert("没有书名")
				} else if (!this.bookIsbn) {
					this.$Inter.JerryAlert("没有ISBN序列号")
				} else if (!this.bookPrice) {
					this.$Inter.JerryAlert("没有书价格")
				} else if (!this.bookAuthor) {
					this.$Inter.JerryAlert("没有作者")
				} else if (this.bookNumber < 1) {
					this.$Inter.Jerry = lert("书本规格不正确")
				} else {
					this.$api.insertBookByUser(this.imageUrl, this.bookTitle, this.bookAuthor, this.bookPrice, this
						.cateIndex, uni.getStorageSync("id"), 0, 1, this.bookNumber, false);
					this.$Inter.JerryAlert("上传成功");
					this.bookTitle = "";
					this.bookIsbn = "";
					this.bookPrice = "";
					this.bookMobile = "";
					this.fileList1.splice(0,1)
					this.imageUrl = "";
					this.bookNumber = 1; //用户上传的书籍数量
					this.bookAuthor = "";
				}
				this.show = false;
			},
			cancel() {
				this.show = false;
			}
		},
		onShow() {
			if (!uni.getStorageSync("username")) {
				return uni.showModal({
					title: "您还没有登录",
					content: "点击确定跳转登录",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: "../login/login"
							})
						}
					}
				})
			}
			this.dataGet();
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #EEEEEE;
	}

	.container {
		background-color: #EEEEEE;
		width: 100%;
		height: 100%;
	}

	.wrap {
		background-color: #FFFFFF;
		width: 94%;
		border-radius: 5px;
		margin: 0 auto;
		margin-top: 10px;

	}

	.title {
		display: flex;
		margin-top: 10px;
		border-top: 1px solid #b9b9b9;
		height: 100rpx;
		color: #b9b9b9;

		.bookName {
			color: #b9b9b9;
		}
	}

	.isbn {
		height: 100rpx;
		display: flex;
		border-top: 1px solid #b9b9b9;
		color: #b9b9b9;
		align-items: center;
	}

	.num {}

	.category {
		background-color: #FFFFFF;
		margin-top: 10px;
		width: 100%;
		text-align: center;
		display: flex;

		.view1 {
			flex: 2;
			display: flex;
			justify-content: flex-start;
		}

		.view2 {
			flex: 1;
			display: flex;
			justify-content: flex-start;
			text-align: center;
		}
	}

	.uBtn {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.uTag {
		width: 80%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bottom {
		position: fixed;
		width: 100%;
		margin-top: 20px;
	}
</style>
