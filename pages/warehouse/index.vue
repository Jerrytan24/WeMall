<template>
	<view class="top">
		<view class="seller">
			<view class="seller_top">
				<view class="info">
					<u-avatar :src="userImage"></u-avatar>
					<u-text :text="sellerName"></u-text>
				</view>
				<view class="right">
					<view class="yuan" @click="focusUser">
						<u-icon size="14" color="#ff0000" :name="iconName"></u-icon>
						<u-text color="#ff0000" size="12" :text="value"></u-text>
					</view>
				</view>
			</view>
			<view class="seller_bottom">
				<view class="utag">
					<view style="width: 320rpx;">
						<u-tag class="textTag" text="广东技术师范大学优秀卖家" size="mini" type="warning" shape="circle"></u-tag>
					</view>
				</view>
				<view class="fans">
					<u-icon name="account-fill"></u-icon>
					<u-text :text="sellerFans"></u-text>
				</view>
			</view>
		</view>
		<bookList :JerryData="list" :JerryCollects="JerryCollects"></bookList>
	</view>
</template>
<script>
	import bookList from "@/components/book_list/book_list.vue";
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				sellerId: 0,
				userId:0,//用户id
				sellerName: "",
				sellerFans:0,
				list: [],
				JerryCollects: 1,
				value: "点击关注",
				iconName:"plus",
				iconFlag:false,
			}
		},
		methods: {
			focusUser(){
				if(!this.iconFlag){
					this.iconName = "checkbox-mark";
					this.value = "已关注";
					this.iconFlag = true;
					this.sellerFans++;
					this.$api.insertAttent(uni.getStorageSync("id"),this.sellerId);
					this.$api.updateAttent(this.sellerId,1)
				}else {
					this.iconName = "plus";
					this.value = "取消关注";
					this.iconFlag = false;
					this.sellerFans--;
					this.$api.deleteAttent(this.userId,this.sellerId);
					this.$api.updateAttent(this.sellerId,-1)
				}
				
			},
			async getUserByFans(user_id){
				const res = await this.$JerryRequest({
					url:"/getUserByFans?user_id="+user_id,
					token:uni.getStorageSync("token"),
				})
				this.sellerFans = res.data.fans;
			},
			async dataGet(user_id) {
				const res = await this.$JerryRequest({
					url: "/getBookUserByIndex?user_id=" + user_id,
					token:uni.getStorageSync("token"),
				})
				this.list = res.data;
			}
		},
		components: {
			bookList,
		},
		onShow() {
		},
		onLoad(options) {
			let that = this;
			this.userId = uni.getStorageSync("id");
			this.sellerId = options.sellerId;
			this.sellerName = options.username;
			this.dataGet(this.sellerId);
			this.getUserByFans(this.sellerId);
			this.$JerryRequest({
				url:"/getAttent?user_id="+that.userId+"&seller_id="+that.sellerId,
				token:uni.getStorageSync("token"),
			}).then(res => {
				if(res.statusCode == 200){
					this.iconFlag = true;
					this.value = "已关注"
					this.iconName = "checkbox-mark";
				}else{
					this.iconFlag = false;
					this.iconName = "plus";
					this.value = "点击关注"
				}
			})
		},
		computed: {
			...mapState({
				"userImage": "userImage"
			})
		}
	}
</script>

<style lang="scss" scoped>
	.seller {
		background-color: #EEEEEE;
		width: 100%;
		height: 200rpx;
	}
	.seller_top {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 50%;
		.info {
			flex: 1;
		}
	}
	.seller_bottom {
		margin-top: 5px;
		width: 100%;
		height: 40%;
		display: flex;
		align-items: center;
		// justify-content: center;
		.utag {
			.textTag {
				width: 400rpx;
			}
			flex:6;
		}
		.fans {
			flex:1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}
	.yuan {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		height: 60rpx;
		width: 130rpx;
		border-radius: 30rpx;
	}
</style>
