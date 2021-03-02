<template>
	<view class="main">
		<uni-segmented-control :current="current" :values="items" styleType="text" @clickItem="onClickItem" activeColor="#ff6600"></uni-segmented-control>
		<view class="content">
			<view v-show="current === index1" class="content-item" v-for="(node,index1) in items" :key="node">
				<view class="left-tab">
					<view v-if="index1===0" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list1 " :key="index" @click="changTab(index)">{{item}}</view>
					<view v-if="index1===1" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list2" :key="index" @click="changTab(index)">{{item}}</view>
					<view v-if="index1===2" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list3" :key="index" @click="changTab(index)">{{item}}</view>
					<view v-if="index1===3" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list4" :key="index" @click="changTab(index)">{{item}}</view>
				</view>
				
				<view class="right-box">
					<scroll-view scroll-y="true" class="scroll">
						<view>
							<book-intro :list="data" :limit="0"></book-intro>
						</view>
					</scroll-view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {textList} from '../home/data.js'
export default {
	data() {
		return {
			items: ['男生', '女生','教育','休闲娱乐'],
			current: 0,
			list1:['都市', '玄幻', '仙侠武侠', '科幻' ,'游戏动漫','悬疑灵异','军事','体育'],
			list2:['都市言情', '古代言情','青春校园','仙侠武侠', '游戏动漫','悬疑灵异'],
			list3:['外语', '考研','高考','初中','小学','儿童'],
			list4:['相声评书', '娱乐','戏曲','广播剧','商业财经'],
			active: 0,
			data:textList
		};
	},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		},
		//点击排行
		changTab(index){
			this.active = index
		}
	}
};
</script>

<style lang="less" scoped>
	.main{
		height: 100%;
		
	}
	.content{
		// padding-top: 20rpx;
		height: 90vh;
		// background-color: #f0f0f0;
		.content-item{
			// border-top: 1rpx solid #666666;
			margin-top: 10rpx;
			padding-top: 10rpx;
			display: flex;
			height: 100%;
			flex-direction: row;
			.left-tab{
				width: 25vw;
				background-color: #f0f0f0;
				.check-bth{
					line-height: 75rpx;
					height: 75rpx;
					font-size: 26rpx;
					margin-top: 2rpx;
					text-align: center;
					// height: 100%;
				}
				.check-active{
					border-left: 7rpx solid #ff8d0b;
					background-color: #ffffff;
					color: #ff8d0b;
				}
			}
			.right-box{
				width: 560rpx;
				// padding: 20rpx;
				// overflow: hidden;
				
				background-color: #FFFFFF;
				.scroll{
					height: 95%;
				}
			}
		}
		
	}
</style>
