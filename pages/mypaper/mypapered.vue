<template>
	<view class="u-page">
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<view class="album" v-for="(item,index) in list">
					<view class="album__avatar">
						<image :src="item.userImage" mode="" style="width: 32px;height: 32px;"></image>
					</view>
					<view class="album__content">
						<u--text :text="item.username" type="primary" bold size="17"></u--text>
						<u--text margin="0 0 8px 0" :text="item.text"></u--text>
						<view>
							<u-text  @click="deleteReply(index,item.textId)" class="deleteIcon iconfont icon-shanchu" size="13"
								type="warning"></u-text>
						</view>
						<image :src="item.image" mode="widthFix" class="myImg"></image>
						
					</view>
				</view>
			</view>
		</view>
		<u-modal @confirm="confirm" showCancelButton @cancel="cancel" :show="show" :title="titleModel" :content='contentModel'></u-modal>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				albumWidth: 0,
				list: [],
				show: false,
				titleModel: '删除',
				contentModel: '是否删除这条动态',
				currentIndex:0,
				textId:0,
			}
		},
		components: {},
		computed: {},
		methods: {
			confirm(){
				let that = this;
				this.$JerryRequest({
					url:"/deleteMsgUserById?text_id="+that.textId,
					method:"DELETE",
					token:uni.getStorageSync("token"),
				})
				this.list.splice(this.currentIndex,1);
				this.show = false;
			},
			cancel(){
				this.show = false;
			},
			deleteReply(index,text_id){
				this.currentIndex = index;
				this.textId = text_id;
				this.show = true;
			},
			async dataGet(user_id) {
				const res = await this.$JerryRequest({
					url: "/getMsgUserByUser?user_id="+user_id,
					token:uni.getStorageSync("token"),
				})
				this.list = res.data;
				// console.log(this.list)
			}
		},
		onShow() {
			this.dataGet(uni.getStorageSync("id"));
		}
	}
</script>
<style lang="scss">
	.myImg {
		width: 300rpx;
		height: 250rpx;
	}
	.deleteIcon {
		margin-left: 92% !important;
	}
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
