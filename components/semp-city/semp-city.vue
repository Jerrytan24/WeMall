<template>
	<view class="semp-city">		
		<view class="has-choose-box flex-row pad-left">
			<text class="has-choose" :class="index==showRank?'active':''" v-for="(item,index) in cityList" :key="index" @click="onRankClick(index)" v-show="index<=showRank">{{item.name!='0'?item.name:'请选择'}}</text>			
		</view>
		<view>
		<scroll-view id="city-item-box" scroll-y="true">
			<view class="city-item pad-left flex-row" :class="item.value==valueObj[cityList[showRank].identify].value?'active':''" v-for="(item,index) in cityList[showRank].showList" :key="index" @click="onChooseClick(item)">
				<view>{{item.label}}</view>
				<view v-if="item.value==valueObj[cityList[showRank].identify].value">
					<semp-icon type="gou" color="#0faeff" size="26"></semp-icon>
				</view>
			</view>
			<view class="city-item pad-left flex-row"  @click="onChooseClick(other)" v-if="showRank>1">
				<view>其它(如没有你的镇区，街道请在详细地址输入)</view>			
			</view>	
		</scroll-view>
		</view>
	</view>
</template>

<script>
	import cityData from '../../common/city.data.js';
	export default {
		data() {
			return {
				other:{
					label:"",
					value:'0'
				},
				showRank:0,								
				cityList:[
					{
						identify:'province',
						name:'0',
						showList:cityData[this.platform]
					},
					{
						identify:'city',
						name:'0',
						showList:[]
					},
					{
						identify:'county',
						name:'0',						
						showList:[]
					},
					{
						identify:'town',
						name:'0',
						showList:[]
					}
				],
				valueObj:{
					province:{
						label:'',												
						value:'0'
					},
					city:{
						label:'',						
						value:'0'
					},
					county:{
						label:'',						
						value:'0'
					},
					town:{
						label:'',						
						value:'0'
					},						
				}		
			};
		},
		props: {
			platform: String,
			default: 'tb'
		},
		methods:{
			onChooseClick(item){			
				if(item.childrens!='' && item.childrens){
					this.valueObj[this.cityList[this.showRank].identify].label=item.label;
					this.valueObj[this.cityList[this.showRank].identify].value=item.value;
					this.cityList[this.showRank].name=item.label;					
					this.showRank++;
					this.cityList[this.showRank].showList=item.childrens;
				}else{
					this.valueObj.town.label='';
					this.valueObj.town.value='0';
					this.valueObj[this.cityList[this.showRank].identify].label=item.label;
					this.valueObj[this.cityList[this.showRank].identify].value=item.value;	
					this.$emit('confirm',this.valueObj);
				}
			},
			onRankClick(key){
				this.showRank=key;
			},			
		},
		computed: {
			
		}
		
	
	}

</script>

<style>
	.flex-row{
		display: flex;
		flex-direction: row;
	
	}
	.pad-left{
		padding-left:30upx
	}
	view{
		font-size:26upx;
	}
	.semp-city{
		
	}
   .has-choose-box{
	   height:60upx;
	   box-shadow:  0 5upx 5upx #ccc;
	   
	}
	.has-choose{
		margin-right:50upx;
		border-bottom:2px solid #f5f5f5;
	}
	.has-choose.active{
		color:#0faeff;
		border-color:#0faeff;
	}
	#city-item-box{
		height:500upx;
	}
	.city-item{
		height:80upx;		
		border-bottom:1upx solid #fff;
	}
	.city-item view{
		justify-content: center;
	}
	.city-item.active{
		color:#0faeff;
	}
	.flex-row {
		display: flex;
		flex-direction: column;
		flex-direction: row;
	}
	.pad-left {
		padding-left: 30upx;;
	}
</style>
