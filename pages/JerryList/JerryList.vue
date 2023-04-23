<template>
	<!--
	 本页面模板教程：https://ext.dcloud.net.cn/plugin?id=2587
	 uni-list 文档：https://ext.dcloud.net.cn/plugin?id=24
	 uniCloud 文档：https://uniapp.dcloud.io/uniCloud/README
	 unicloud-db 组件文档：https://uniapp.dcloud.io/uniCloud/unicloud-db
	 DB Schema 规范：https://uniapp.dcloud.net.cn/uniCloud/schema
	 -->
	<view>
		<!-- 刷新页面后的顶部提示框 -->
		<view class="tips" :class="{ 'tips-ani': tipShow }">为您更新了10条最新新闻动态</view>
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="formData" :collection="collection"
		 :field="field" @load="load">
			<!-- 基于 uni-list 的页面布局 -->
			<uni-list>
				<!-- to属性：将新闻ID和标题传给详情页 -->
				<!-- TODO：需增加日期格式化的示例 -->
				<uni-list-item direction="row" v-for="item in data" :key="item.id" :title="item.title" :to="'/pages/detail/detail?id='+item._id+'&title='+item.title">
					<!-- 通过body插槽定义列表内容显示 -->
					<template v-slot:body>
						<view class="uni-list-box uni-content">
							<view class="uni-title uni-ellipsis-2">{{item.title}}</view>
							<view class="uni-note">
								<text>{{item.user_name}}</text>
								<text>{{item.last_modify_date}}</text>
							</view>
						</view>
					</template>
					<!-- 通过footer插槽自定义图片右侧显示 -->
					<template v-slot:footer>
						<view class="uni-thumb" style="margin: 0;">
							<!-- 当前判断长度只为简单判断类型，实际业务中，根据逻辑直接渲染即可 -->
							<image :src="item.avatar.length > 3?item.avatar : item.avatar[0]" mode="aspectFill"></image>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
			<uni-load-more v-if="loading || options.status === 'noMore' " :status="options.status" />
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				// 数据表名
				collection: 'opendb-news-articles',
				// 查询字段，多个字段用 , 分割
				field: '_id,mode,avatar,title,user_name,excerpt,last_modify_date',
				formData: {
					status: 'loading', // 加载状态
				},
				tipShow: false // 是否显示顶部提示框
			};
		},
		onLoad() {},
		methods: {
			load(data, ended) {
				if (ended) {
					this.formData.status = 'noMore'
				}
			}
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			this.formData.status = 'more'
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				this.tipShow = true
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.tipShow  = false
				},1000)
				uni.stopPullDownRefresh()
			})
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
	};
</script>

<style lang="scss">
	@import '@/common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.uni-list-box {
		margin-top: 0;
	}

	.uni-content {
		padding-right: 10px;
	}

	.uni-note {
		display: flex;
		margin: 0;
		justify-content: space-between;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.content {
		width: 100%;
		display: flex;
	}

	.list-picture {
		width: 100%;
		height: 145px;
	}

	.thumb-image {
		width: 100%;
		height: 100%;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
