# sunui-mverify for sunUI

-----------------------------------


# 示例如下(复制以下即可使用,把script标签套上即可运行),引入的话参考组件：https://uniapp.dcloud.io/use?id=%E5%85%A8%E5%B1%80%E7%BB%84%E4%BB%B6
```
<template>
	<view class="sunui">
		<view class="sunui-title">右滑拖动验证</view>
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
		components:{
			sunuiMverify
		},
		methods: {
			mverify(e){
				console.log('验证结果:',e);
			}
		}
	}
</script>

```